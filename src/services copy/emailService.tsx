import axios from "axios";

interface ServiceResponse{
  success: boolean;
  message: string;
}

export const sendEmail = async (subject: string, message: string):Promise<ServiceResponse>=>{
  try{

    const data = {
      subject: subject,
      html: message
    }

    const response = await axios.post("/api/contact", data, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return ({success:true, message:response.data.message});
  } catch(error:unknown){
      if (axios.isAxiosError(error)){
        return({success:false, message: error.response?.data?.message || error.message})
      }else{
        return({success:false, message:"Ocurrio un error inesperado"})
      }

  }
}