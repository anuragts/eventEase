import { NextApiRequest, NextApiResponse } from "next";
import { openAi } from "@/config/openAi.config";
import sample from "@/utils/sample";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    type PlanRequestBody = {
        budget: number;
        location: string;
        size: string;
        type: string;
        extra: string;
      };
    const { budget, location, size, type, extra } = req.body as PlanRequestBody;
    const message:string = `I am organizing a ${type} in ${location}. My budget is ${budget}. My expected number of guests/participants is ${size}. ${extra}  Give me a plan .`;
   const response = await openAi.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": `${sample.system}`},  
            {"role": "user", "content": `${sample.user1}`},
            {"role": "assistant", "content": `${sample.assistant}`},
            {"role": "user", "content": `${message}`}
        ]
})

    res.status(200).json(response.data.choices[0].message?.content);


}