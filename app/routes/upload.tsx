import {useState, type FormEvent} from 'react'
import { useNavigate, useParams } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'
import { prepareInstructions } from '~/constants';
import { convertPdfToImage } from '~/lib/pdf2img';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';

const upload = () => {
    const {auth, isLoading, fs, ai, kv}= usePuterStore();
   const navigate:any =useNavigate();
    const[isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile]= useState<File | null>(null);






const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
}: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
}) => {
    setIsProcessing(true);

    try {
        // 1. Upload PDF
        setStatusText("Uploading the file...");
        console.log("Starting file upload...", file);

        const uploadedFile: any = await fs.upload([file]);

        console.log("Upload result:", uploadedFile);

        if (!uploadedFile) {
            return setStatusText("Error: Failed to upload file");
        }

        // 2. Convert PDF to image
        setStatusText("Converting to image...");
        console.log("Starting PDF conversion...");

        const imageFile = await convertPdfToImage(file);

        console.log("PDF conversion result:", imageFile);

        if (!imageFile.file) {
            return setStatusText(
                `Error: ${
                    imageFile.error || "Failed to convert PDF to image"
                }`
            );
        }

        // 3. Upload image
        setStatusText("Uploading the image...");
        console.log("Starting image upload...");

        const uploadedImage: any = await fs.upload([imageFile.file]);

        console.log("Image upload result:", uploadedImage);

        if (!uploadedImage) {
            return setStatusText("Error: Failed to upload image");
        }

        // 4. Prepare data
        setStatusText("Preparing data...");

        const uuid = generateUUID();

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: "",
        };

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        // 5. Analyze resume
        setStatusText("Analyzing...");

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({
                jobTitle,
                jobDescription,
            })
        );

        if (!feedback) {
            return setStatusText("Error: Failed to analyze resume");
        }

        const feedbackText =
            typeof feedback.message.content === "string"
                ? feedback.message.content
                : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analysis complete, redirecting...");

        console.log(data);
        navigate(`/resume/${uuid}`);

    } catch (error) {
        console.error("HANDLE ANALYZE ERROR:", error);

        setStatusText(
            `Error: ${
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            }`
        );
    }
};

//   const handleAnalyze= async({
//     companyName,
//     jobTitle,
//     jobDescription,
//     file}: {
//     companyName: string,
//     jobTitle: string,
//     jobDescription: string , 
//     file: File;})=>{
//     setIsProcessing(true);
//     setStatusText("uploading the file...");
//     // const uploadedFile: any= await fs.upload([file]);
//     // if(!uploadedFile) return setStatusText('Error: failed to uploaed file');



//     setStatusText('Converting to image...');
//     const imageFile= await convertPdfToImage(file);
//     if(!imageFile.file) return setStatusText("Error: failed to convert PDF to image..");

    

// try {
//     console.log("Starting file upload...", file);

//     const uploadedFile: any = await fs.upload([file]);

//     console.log("Upload result:", uploadedFile);

//     if (!uploadedFile) {
//         return setStatusText("Error: failed to upload file");
//     }

//     setStatusText("Converting to image...");

//     const imageFile = await convertPdfToImage(file);

//     if (!imageFile.file) {
//         return setStatusText(
//             `Error: ${imageFile.error || "failed to convert PDF to image"}`
//         );
//     }

//     setStatusText("Uploading the image...");

   

//     // continue with the rest of your code...


//     setStatusText("Uploading the image...");
//     const uploadedImage = await fs.upload([imageFile.file]);
//     if(!uploadedImage) return setStatusText("Error: Failed to upload image");

//     setStatusText('Preparing Data...');

//     const uuid = generateUUID();
//     const data={
//         id:uuid,
//         resumePath: uploadedFile.path,
//         imagePath : uploadedImage.path,
//         companyName,jobTitle, jobDescription,
//         feedback:'',
//     }
//     await kv.set(`resume:${uuid}`, JSON.stringify(data));
//     setStatusText('Analyzing....');
//     const feedback= await  ai.feedback(
//         uploadedFile.path,
//         // 'You are an export in ATS (applicant tracking sysytem) and resume analysis...'    ----would take long to type manually 
//         prepareInstructions({jobTitle, jobDescription})
//     )
//     if(!feedback) return setStatusText('Error: Failed to analyze resume ');
//     const feedbackText =
//     typeof feedback.message.content === 'string'
//     ? feedback.message.content
//     : feedback.message.content[0].text;
//     data.feedback= JSON.parse(feedbackText);
//     await kv.set(`resume:${uuid}`, JSON.stringify(data));
//     setStatusText('Analysis complete, redirecting...');
//     console.log(data);
//   }
    


// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;

//     if (!file) {
//         alert('Please upload a resume first');
//         return;
//     }

//     const formData = new FormData(form);

//     const companyName = formData.get('company-name') as string;
//     const jobTitle = formData.get('job-title') as string;
//     const jobDescription = formData.get('job-description') as string;

//     handleAnalyze({
//         companyName,
//         jobTitle,
//         jobDescription,
//         file
//     });
// };


  
// //     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     const form =e.currentTarget;

// //     if (!file) {
// //         alert('Please upload a resume first');
// //         return; }
// //         const formData=new FormData ( form);

// //         const companyName= formData.get('company-name')as string;
// //         const jobTitle= formData.get('job-title')as string;
// //         const jobDescription= formData.get('job-description')as string;
      
// //         console.log({
// //             companyName, jobDescription, jobTitle, file
// //         })
// //    }

//     // if(!file) return;
//     // handleAnalyze({companyName, jobTitle, jobDescription, file});


//  const handleFileSelect = (file: File | null) => {  
//     setFile(file);

//  }

// return (
//     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
//    <Navbar/>
   


//     <section className="main-section">
//         <div className='page-heading py-16 '>
//             <h1>Smart feedback for your dream job.</h1>
//             {isProcessing ? (
//                 <>
//                 <h2>{statusText}</h2>
//                 <img src='/images/resume-scan.gif' className='w-full'></img>
//                 </>
//             ): (
//                 <h2>Upload your resume for an ATS score and improvement tips.</h2>
//             )}
//             {!isProcessing && (
//                 <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 items-center justify-center mt-8'>
//                 <div className='form-div'>
//                     <label htmlFor='company-name'>Company Name</label>
//                     <input type='text' name='company-name' placeholder='Enter the company name' id='company-name' ></input>
//                 </div>
//                 <div className='form-div'>
//                     <label htmlFor='job-title'>Job Title</label>
//                     <input type='text' name='job-title' placeholder='Enter the job title' id='job-title' ></input>
//                 </div>
//                 <div className='form-div'>
//                     <label htmlFor='job-description'>Job Description</label>
//                     <textarea rows={5} name='job-description' placeholder='Enter the job description' id='job-description' ></textarea>
//                 </div>
//                 <div className='form-div'>
//                     <label htmlFor='uploader'>upload Resume</label>
//                     <FileUploader onFileSelect={handleFileSelect} />
//                 </div>
//                 <button className='primary-button' type='submit'>
//                  Upload Resume
//                 </button>

//                 </form>

//            ) }



//         </div>
//     </section>
//     </main>
//   )
// }



const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!file) {
        alert("Please upload a resume first");
        return;
    }

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    handleAnalyze({
        companyName,
        jobTitle,
        jobDescription,
        file,
    });
};

const handleFileSelect = (file: File | null) => {
    setFile(file);
};

return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Smart feedback for your dream job.</h1>

                {isProcessing ? (
                    <>
                        <h2>{statusText}</h2>
                        <img
                            src="/images/resume-scan.gif"
                            className="w-full"
                            alt="Resume scanning"
                        />
                    </>
                ) : (
                    <h2>
                        Upload your resume for an ATS score and improvement
                        tips.
                    </h2>
                )}

                {!isProcessing && (
                    <form
                        id="upload-form"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 items-center justify-center mt-8"
                    >
                        <div className="form-div">
                            <label htmlFor="company-name">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="company-name"
                                placeholder="Enter the company name"
                                id="company-name"
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input
                                type="text"
                                name="job-title"
                                placeholder="Enter the job title"
                                id="job-title"
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-description">
                                Job Description
                            </label>
                            <textarea
                                rows={5}
                                name="job-description"
                                placeholder="Enter the job description"
                                id="job-description"
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="uploader">
                                Upload Resume
                            </label>

                            <FileUploader
                                onFileSelect={handleFileSelect}
                            />
                        </div>

                        <button
                            className="primary-button"
                            type="submit"
                        >
                            Upload Resume
                        </button>
                    </form>
                )}
            </div>
        </section>
    </main>
);
};

export default upload;

// export default upload