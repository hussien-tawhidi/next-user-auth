import { NextApiRequest, NextApiResponse } from "next";
import { connectionToMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
import { IUser } from "@/types";
import { hash } from "bcryptjs";
import mongoose from "mongoose";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   connectionToMongoDB().catch((err) => res.json(err));

//   if (req.method === "POST") {
//     if (!req.body) return res.status(400).json({ error: "Data has missing" });
//     const { fullName, email, password } = req.body;
//     const userExist = await User.findOne({ email });

//     if (userExist) {
//       return res.status(409).json({ error: "User already exist" });
//     } else {
//       if (password.length < 6) {
//         return res
//           .status(409)
//           .json({ error: "Password must be atleast 6 character" });
//       }

//       const hashedPassword = await hash(password, 12);

//       User.create(
//         {
//           fullName,
//           email,
//           password: hashedPassword,
//         },
//         (error: unknown, data: IUser) => {
//           if (error && error instanceof mongoose.Error.ValidationError) {
//             //   mongodb will return an ARRAY
//             //   but we want to show only one error in a time
//             for (let field in error.errors) {
//               const msg = error.errors[field].message;
//               return res.status(409).json({ error: msg });
//             }
//           }
//           const user = {
//             email: data?.email,
//             fullName: data?.fullName,
//             _id: data?._id,
//           };
//           return res.status(201).json({
//             success: true,
//             user,
//           });
//         }
//       );
//     }
//   } else {
//     res.status(405).json({ error: "Method not found" });
//   }
// };

// export default handler

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectionToMongoDB();

    if (req.method === "POST") {
      if (!req?.body) return res?.status(400).json({ error: "Data has missing" });
      const { fullName, email, password } = req?.body;
      const userExist = await User?.findOne({ email });

      if (userExist) {
        return res?.status(409).json({ error: "User already exist" });
      } else {
        if (password.length < 6) {
          return res
            .status(409)
            .json({ error: "Password must be atleast 6 character" });
        }

        const hashedPassword = await hash(password, 12);

        const newUser = await User?.create({
          fullName,
          email,
          password: hashedPassword,
        });

        const user = {
          email: newUser?.email,
          fullName: newUser?.fullName,
          _id: newUser?._id,
        };
        return res?.status(201).json({
          success: true,
          user,
        });
      }
    } else {
      res?.status(405).json({ error: "Method not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler

