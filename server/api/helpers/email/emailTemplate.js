exports.generateLeadEmailTemplate = (data) => {
   const { name, email, subject, content, contact_number } = data;
   return (`<!DOCTYPE html>
   <html lang="en">
     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forgot Password</title>
        <style>
   h1 {text-align: center;}
           @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
        </style>
        <style>
           body {
           background: #ccc;
           font-family: 'Poppins', sans-serif;
           }
        </style>
     </head>
     <body>
        <div id="forgotPassowrd" style=" min-width: 600px; width: 600px;
           margin: 0 auto;  position: relative;align-center;
           background: #fff;">
           <div>
              <p>Hi,</p>
              <p> 
              Name : ${name}
               </p>
              <p> 
              Email : ${email ? email : ""}
               </p>
               <p> 
               Subject : ${subject ? subject : ""}
                </p>
                <p> 
                Conatct Number : ${contact_number ? contact_number : ""}
                 </p>
               <p> 
               Description : ${content ? content : ""}
                </p>
              
               
           </div>
           </div>
        </div>
     </body>
   </html>`)
}


