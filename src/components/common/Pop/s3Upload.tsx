// import { PutObjectCommand, PutObjectRequest, S3Client } from '@aws-sdk/client-s3';
// import { Button, CircularProgress, FormControl, InputLabel } from '@mui/material';
// import * as React from 'react';
// import { Controller } from 'react-hook-form';
// import { BootstrapInput, newFilm } from './index';
// import _ from 'lodash'
// import axios from 'axios';
// interface Props {
//   film: newFilm;
//   setFilm: any;
//   control: any;
//   title:string;
//   field:string;
//   type:string;
// }

const S3Upload = () => {
//   const { film, setFilm, control, title, field, type } = props;
//   const [loading, setLoading] = React.useState(false);
//   return (
//     <>
//       <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
//         <InputLabel shrink htmlFor="bootstrap-input">
//           {title}
//         </InputLabel>
//         <BootstrapInput defaultValue={_.get(film, `${field}`)}
//         value={_.get(film, `${field}`) ? _.get(film, `${field}`) : ''} 
//         placeholder={`Enter ${field}`} disabled id="bootstrap-input" />
//         {loading ? (
//           <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
//             <CircularProgress color="secondary" />
//           </Button>
//         ) : (
//           <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
//            Upload {title}
//             <Controller
//               render={({ field: { onChange, onBlur, value, name, ref } }) => (
//                 <input
//                   type="file"
//                   hidden
//                  accept={type === "videos" ?  "video/mp4,video/x-m4v,video/*" : 'image/*'}
//                   onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
//                     if (e.target.files) {
//                       setLoading(true);
//                       // const config = {
//                       //   bucketName: 'films-server',
//                       //   dirName: 'videos',
//                       //   region: 'ap-southeast-1',
//                       //   accessKeyId: process.env.AccessKeyId,
//                       //   secretAccessKey: process.env.SecretAccessKey,
//                       // };
//                       const formData = new FormData();
//                       formData.append("file", e.target.files[0])
//                       const data = await axios.post(process.env.REACT_APP_API_BASE_URL + "/films/uploadFile", formData,{
//                         headers:{
//                           "Content-Type": "multipart/form-data"
//                         }
//                       })
                    
//                       // const s3Client = new S3Client({
//                       //   region: 'ap-southeast-1',
//                       //   credentials: {
//                       //     accessKeyId: String(process.env.REACT_APP_PUBLIC_AccessKeyId),
//                       //     secretAccessKey: String(process.env.REACT_APP_PUBLIC_SecretAccessKey),
//                       //   },
//                       // });

//                       // const params: PutObjectRequest = {
//                       //   Bucket: 'films-server',
//                       //   Key: type + "/" + e.target.files[0].name,
//                       //   Body: e.target.files[0],
//                       // };
//                       // const command = new PutObjectCommand(params);
//                       // const data = await s3Client.send(command);
//                       // console.log('data', data);
//                       // const s3 = new S3({
//                       //   region: config.region,
//                       //   accessKeyId: config.accessKeyId,
//                       //   secretAccessKey: config.secretAccessKey,
//                       // })
//                       // const updateFile = {
//                       //   Bucket: config.bucketName,
//                       //   Body: e.target.files[0],
//                       //   Key: 'videos/' + e.target.files[0].name
//                       // }
//                       // await s3.upload(updateFile).promise()
//                       console.log(data.data)
//                       setFilm({ ...film, [field]: data.data });
//                       setLoading(false);
//                       onChange(data.data);
//                     }
//                   }}
//                   ref={ref}
//                   name={name}
//                 />
//               )}
//               name={field}
//               control={control}
//             />
//           </Button>
//         )}
//       </FormControl>
//     </>
//   );
};

export default S3Upload;
