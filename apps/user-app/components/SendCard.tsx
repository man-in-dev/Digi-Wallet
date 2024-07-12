"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);

    return (
        <Card title="Send">
            <div className="w-full pt-2">
                <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                    setNumber(value)
                }} />
                <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                    setAmount(Number(value))
                }} />
                <div className="pt-4 flex justify-center">
                    <Button onClick={async () => {
                        await p2pTransfer(number, amount * 100)
                    }}>Send</Button>
                </div>
            </div>
        </Card>
    )
}