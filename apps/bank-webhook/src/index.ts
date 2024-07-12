import express from "express";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json());

interface paymentInformationInterface {
    token: string;
    userId: string;
    amount: string
}

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const paymentInformation: paymentInformationInterface = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        const trans = await prisma.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token
            }
        });
    
        if(trans?.status === "Success") {
            return res.json({
                message: "already captured"
            })
        }

        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e: any) {
        console.error(e.message);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);