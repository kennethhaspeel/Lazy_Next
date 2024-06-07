import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import {BevestigRegistratieTemplate} from '../EmailTemplates/BevestigRegistratie'
import { PaswoordResetTemplate } from "../EmailTemplates/PaswoordReset";

export async function ZendMail({to,subject,body}:{to:string,subject:string,body:string}){

    const { MAIL_SERVER, MAIL_PASSWORD, MAIL_USERNAME, MAIL_SENDER_EMAIL,MAIL_SENDER_NAME } = process.env;
    
    var transport = nodemailer.createTransport({
      host: MAIL_SERVER,
      port: 587,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });
//  try {
//     const test = await transport.verify()
//     console.log(`Resultaat van Transport test: ${test}`)
//  }
//  catch(e){
//     console.log(e)
//  }

 try {
    const sendResult = await transport.sendMail({
        from:MAIL_SENDER_EMAIL,
        to,
        subject,
        html:body
    })
    console.log(sendResult)
 }
 catch(error){
    console.log(error)
 }
}

export function compileerActivatieMail(name:string,url:string){
    const template = Handlebars.compile(BevestigRegistratieTemplate)
    const htmlBody = template({name,url})
    return htmlBody
}

export function compileerPaswoordResetMail(name:string,url:string){
  const template = Handlebars.compile(PaswoordResetTemplate)
  const htmlBody = template({name,url})
  return htmlBody
}