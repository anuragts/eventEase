import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/config/openAi.config";
import sample from "@/utils/sample";

export default async (req:NextApiRequest, res:NextApiResponse) => {
   const response = await openAi.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": `${sample.system}`},  
            {"role": "user", "content": `${sample.user1}`},
            {"role": "assistant", "content": `${sample.assistant}`},
            {"role": "user", "content": `${req.body.message}`}
        ]
})

    res.status(200).json(response.data);


}