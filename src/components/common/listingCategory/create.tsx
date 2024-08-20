import  React,{useRef, useState} from 'react';
import { styled, Box, BoxProps, TextField,alpha,FormControl, Button, InputLabel } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { CreateNewListingCategory } from 'apis/actor';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createActorSchema, CreateFilmSchema } from '../../../helpers/validation';
import CreateFilmInput from '../../../Inputs/createFilmInput';
const Container = styled(Box)<BoxProps>({

    width: "50%",
    height: "80%",
    background: "#fff",
    borderRadius: "20px",
    zIndex: "100",
    overflowY: "auto",
    position:"relative"
})
const MainWrapper = styled(Box)<BoxProps>({
  margin: "20px auto",
  maxWidth: "70%",
  textAlign:"center",
  position:"relative"

})
const Label = styled(Box)<BoxProps>({
    fontWeight: "700",
    fontSize: "24px",
    color: "#252733",
    lineHeight: "150%",
    textAlign: "center"
})
const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
const CloseIcon = styled(Box)<BoxProps>({
    position:"absolute",
    right: "4%",
    top: "4%",
    cursor:"pointer"

})
interface Actor{
    name:string ,
    description: string 
}
export const CreateListingCateogry = ()=>{
    const dispatch = useAppDispatch();
    const reset = useAppSelector((state:any)=>state.films.reset)
    const [value, setValue] = React.useState<Actor>(
       {
        name: "",
        description:""
       }
      )

      const {
        setError,
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid }
      } = useForm<Actor>({
        mode: 'onChange',
        defaultValues: {
          name: "",
        description:""
        },
        resolver: yupResolver(createActorSchema),
      });
    
   const handleCreateActor = async ()=>{
    await CreateNewListingCategory(value.name,value.description);
    dispatch(setField(null))
    dispatch(setReset(!reset))
   }
    return <Container>
            <MainWrapper>
                <Label>Create Listing Category</Label>
              <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Name
                </InputLabel>
                <CreateFilmInput 
          onChange1={(e:any)=> setValue({ ...value, name: e.target.value })} requiredIcon name="name" label="Name" control={control} placeholder="Enter your name" />
                {/* <BootstrapInput value={value.name} onChange={(e:any)=> setValue({...value,name:e.target.value})} placeholder='Enter Name' id="bootstrap-input" /> */}
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Description
                </InputLabel>
                <CreateFilmInput onChange1={(e:any)=> setValue({ ...value, description: e.target.value })} requiredIcon name="description" label="Description" control={control} placeholder="Enter Description " />

                {/* <BootstrapInput value={value.description} onChange={(e:any)=> setValue({...value,description:e.target.value})} placeholder='Enter Description' id="bootstrap-input" /> */}
            </FormControl>
            
            <Button variant="contained"  disabled={!isValid} onClick={handleSubmit(handleCreateActor)} sx={{marginTop: "10px"}}>Create</Button>              
            </MainWrapper>
           <CloseIcon>
            <HighlightOffOutlinedIcon onClick={()=>  dispatch(setField(null))}/>
           </CloseIcon>
    </Container>
    
}