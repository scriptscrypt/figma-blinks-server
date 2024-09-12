// // File: app/api/deploy/route.ts
// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import path from "path";
// import Cors from "cors";

// // Initialize the cors middleware
// const cors = Cors({
//   methods: ["POST", "GET", "HEAD", "OPTIONS"],
// });

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req: Request, res: NextResponse, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export async function POST(request: Request) {
//   const res = NextResponse.next();

//   // Run the CORS middleware
//   await runMiddleware(request, res, cors);

//   try {
//     const body = await request.json();
//     const {
//       paramBlinkTitle,
//       paramBlinkDescription,
//       paramBtnLabel,
//       paramBlinkIpPlaceholder,
//     } = body;

//     // Generate a slug from the title
//     const slug = paramBlinkTitle
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .trim();

//     // Generate a unique identifier
//     const uniqueId =
//       Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

//     // Combine slug and unique identifier
//     const fileName = `${slug}-${uniqueId}.ts`;

//     // Create the content for the new file
//     const fileContent = `
// import {
//   ActionPostResponse,
//   createPostResponse,
//   MEMO_PROGRAM_ID,
//   ActionGetResponse,
//   ActionPostRequest,
//   createActionHeaders,
//   ActionError,
// } from "@solana/actions";
// import {
//   clusterApiUrl,
//   ComputeBudgetProgram,
//   Connection,
//   PublicKey,
//   Transaction,
//   TransactionInstruction,
// } from "@solana/web3.js";

// // create the standard headers for this route (including CORS)
// const headers = createActionHeaders();

// export const GET = async (req: Request) => {
//   const payload: ActionGetResponse = {
//     type: "action",
//     title: "${paramBlinkTitle}",
//     icon: new URL("/solana_devs.jpg", new URL(req.url).origin).toString(),
//     description: "${paramBlinkDescription}",
//     label: "${paramBtnLabel}",
//   };
//   return Response.json(payload, {
//     headers,
//   });
// };

// // DO NOT FORGET TO INCLUDE THE \`OPTIONS\` HTTP METHOD
// // THIS WILL ENSURE CORS WORKS FOR BLINKS
// export const OPTIONS = async () => Response.json(null, { headers });

// export const POST = async (req: Request) => {
//   try {
//     const body: ActionPostRequest = await req.json();
//     let account: PublicKey;
//     try {
//       account = new PublicKey(body.account);
//     } catch (err) {
//       throw 'Invalid "account" provided';
//     }
//     const connection = new Connection(
//       process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
//     );
//     const transaction = new Transaction().add(
//       // note: \`createPostResponse\` requires at least 1 non-memo instruction
//       ComputeBudgetProgram.setComputeUnitPrice({
//         microLamports: 1000,
//       }),
//       new TransactionInstruction({
//         programId: new PublicKey(MEMO_PROGRAM_ID),
//         data: Buffer.from("this is a simple memo message2", "utf8"),
//         keys: [],
//       }),
//     );
//     // set the end user as the fee payer
//     transaction.feePayer = account;
//     transaction.recentBlockhash = (
//       await connection.getLatestBlockhash()
//     ).blockhash;
//     const payload: ActionPostResponse = await createPostResponse({
//       fields: {
//         transaction,
//         message: "Post this memo on-chain",
//       },
//       // no additional signers are required for this transaction
//       // signers: [],
//     });
//     return Response.json(payload, {
//       headers,
//     });
//   } catch (err) {
//     console.log(err);
//     let actionError: ActionError = { message: "An unknown error occurred" };
//     if (typeof err == "string") actionError.message = err;
//     return Response.json(actionError, {
//       status: 400,
//       headers,
//     });
//   }
// };
// `;

//     // Ensure the directory exists
//     const dir = path.join(process.cwd(), "app", "api", "blinks");
//     await fs.mkdir(dir, { recursive: true });

//     // Write the file
//     await fs.writeFile(path.join(dir, fileName), fileContent);

//     return NextResponse.json(
//       { success: true, fileName },
//       {
//         status: 201,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error creating file:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to create file" },
//       {
//         status: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         },
//       }
//     );
//   }
// }

// // Add OPTIONS method to handle preflight requests
// export async function OPTIONS(request: Request) {
//   const res = NextResponse.next();

//   // Run the CORS middleware
//   await runMiddleware(request, res, cors);

//   return NextResponse.json(
//     {},
//     {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       },
//     }
//   );
// }


// File: app/api/deploy/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      paramBlinkTitle,
      paramBlinkDescription,
      paramBtnLabel,
      paramBlinkIpPlaceholder,
    } = body;

    // Generate a slug from the title
    const slug = paramBlinkTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .trim();

    // Generate a unique identifier
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    // Combine slug and unique identifier
    const fileName = `${slug}-${uniqueId}.ts`;

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

    // Ensure the directory exists
    const dir = path.join(process.cwd(),"src", "app", "api", "blinks");
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(path.join(dir, fileName), fileContent);

    return NextResponse.json(
      { success: true, fileName },
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
