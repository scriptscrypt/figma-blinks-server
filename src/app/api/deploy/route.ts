// File: app/api/deploy/route.ts
import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      paramBlinkTitle,
      paramBlinkDescription,
      paramBtnLabel,
      // paramBlinkIpPlaceholder,
    } = body;

    // Generate a slug from the title
    const slug = paramBlinkTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .trim();

    // Generate a unique identifier
    // const uniqueId =
    //   Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    // Generate a unique identifier
    const uniqueId = nanoid();

    // Combine slug and unique identifier
    const folderName = `${slug}-${uniqueId}`;

    // Create the content for the new file
    const fileContent = `
import {
  ActionPostResponse,
  createPostResponse,
  MEMO_PROGRAM_ID,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    type: "action",
    title: "${paramBlinkTitle}",
    icon: new URL("/solana_devs.jpg", new URL(req.url).origin).toString(),
    description: "${paramBlinkDescription}",
    label: "${paramBtnLabel}",
  };
  return Response.json(payload, {
    headers,
  });
};

// DO NOT FORGET TO INCLUDE THE \`OPTIONS\` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }
    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );
    const transaction = new Transaction().add(
      // note: \`createPostResponse\` requires at least 1 non-memo instruction
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple memo message2", "utf8"),
        keys: [],
      }),
    );
    // set the end user as the fee payer
    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Post this memo on-chain",
      },
      // no additional signers are required for this transaction
      // signers: [],
    });
    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};
`;

    // // Ensure the directory exists
    // const dir = path.join(
    //   process.cwd(),
    //   "src",
    //   "app",
    //   "api",
    //   "actions",
    //   "blinks",
    //   folderName
    // );
    // await fs.mkdir(dir, { recursive: true });

    // // Write the file
    // await fs.writeFile(path.join(dir, "route.ts"), fileContent);

    const folderStructure = {
      api: {
        actions: {
          blinks: {
            [uniqueId]: {
              "index.ts": fileContent,
            },
          },
        },
      },
    };
    // Store the content in Vercel KV
    await kv.set(
      `folder_structure:${uniqueId}`,
      JSON.stringify(folderStructure)
    );

    return NextResponse.json(
      {
        success: true,
        folderName,
        blinkUrl: `${process.env.VERCEL_URL}/blinks/${folderName}`,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create file" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// Add OPTIONS method to handle preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const path = searchParams.get("path");

  if (!id || !path) {
    return NextResponse.json(
      { error: "No ID or path provided" },
      { status: 400 }
    );
  }

  try {
    const folderStructure = await kv.get(`folder_structure:${id}`);

    if (!folderStructure) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Navigate the folder structure to get the file content
    const pathParts = path.split("/").filter(Boolean);
    let content: any = folderStructure;
    for (const part of pathParts) {
      if (content && typeof content === "object" && part in content) {
        content = content[part];
      } else {
        return NextResponse.json(
          { error: "File not found in the specified path" },
          { status: 404 }
        );
      }
    }

    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 500 }
      );
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("Error fetching entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch entry" },
      { status: 500 }
    );
  }
}
