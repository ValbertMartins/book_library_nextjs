// import { PrismaClient } from "@prisma/client"
// import { NextApiRequest, NextApiResponse } from "next"

// const prisma = new PrismaClient()

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "DELETE") return res.status(400).json({ message: "invalid request" })

//   try {
//     const deleteBookQuery = await prisma.book.delete({
//       where: {
//         id,
//       },
//     })
//     res.status(200).json({
//       ,
//     })
//   } catch (error) {
//     res.status(500).json({
//       error: {
//         status: 500,
//         message: "Erro ao excluir livro.",
//       },
//     })
//   }
// }
