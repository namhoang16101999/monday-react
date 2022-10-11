import axios from "axios";
import { BE_URL } from "../constants";

export const getOpenAIText = async ({
   type, 
   text
}) => {

    try {
        const { data, status } = await axios({
            method: "POST",
            url: `${BE_URL}/api/openai`,
            data: {
                type, 
                text
            }
        })
        if(status === 200) {
            return data.payload.data
        }
    } catch (err) {
        throw err
    }
}
