import { BlackboxAI } from "@evex/blackbox-ai"
import * as enogu from "@ryu/enogu"

const ai = new BlackboxAI({
    "modelName": "gpt-4o"
})

const user = await ai.startChat({})
const assistant = await ai.startChat({})

const chatHistory: {
    content: string
}[] = [
    {
        content: "しりとりしましょう。"
    },
    {
        content: "りんご"
    }
]

while (true) {
    let roles = ["user", "assistant"] as Array<"user" | "assistant">

    const history1  = chatHistory.map((message, i) => ({
        role: roles[i % 2],
        content: message.content
    }))

    const result1 = await user.generate(history1)

    console.log(enogu.red([roles[0], result1, "\n"].join(" ")))

    chatHistory.push({
        content: result1
    })

    roles = ["assistant", "user"]

    const history2  = chatHistory.map((message, i) => ({
        role: roles[i % 2],
        content: message.content
    }))

    const result2 = await assistant.generate(history2)

    console.log(enogu.blue([roles[0], result2, "\n"].join(" ")))

    chatHistory.push({
        content: result2
    })
}