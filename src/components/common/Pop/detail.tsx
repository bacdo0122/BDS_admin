import React, { useState } from 'react';
import { styled, Box, BoxProps, TextField, TextareaAutosize, alpha, FormControl, Button, InputLabel, List, ListItem, ListItemButton, ListItemText, Autocomplete, ListItemIcon } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
const Container = styled(Box)<BoxProps>({

    width: "50%",
    height: "80%",
    background: "#fff",
    borderRadius: "20px",
    zIndex: "100",
    overflowY: "auto",
    position: "relative"
})
const MainWrapper = styled(Box)<BoxProps>({
    margin: "20px auto",
    maxWidth: "70%",
    textAlign: "center"

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
    position: "absolute",
    right: "4%",
    top: "4%",
    cursor: "pointer"

})
export const Detail = () => {
    const dispatch = useAppDispatch();
    const reset = useAppSelector((state: any) => state.films.reset)
    const detail = useAppSelector((state: any) => state.films.detail)
    const [film, setFilm] = useState({
        BSDId: detail && detail.id,
        userId: detail && detail.user.id,
        price: detail && detail.price,
        regionId: detail && detail.regionId,
        title: detail && detail.title,
        description: detail && detail.description,
        address: detail && detail.address,
        area: detail && detail.area,
        status_listing: detail && detail.status_listing,
        legal_status: detail && detail.legal_status,
        furnishing: detail && detail.furnishing,
        orientation: detail && detail.orientation,
        bedrooms: detail && detail.bedrooms,
        bathrooms: detail && detail.bathrooms,
        types: detail.type && { id: detail.type.id, label: detail.type.name },
        categories: detail.category && { id: detail.category.id, label: detail.category.name },
    })
    const [images, setImages] = useState(detail && detail.image.length > 1 ? detail.image.split(";") : [detail.image]);


    console.log("detail:", detail)

    return <Container>
         <MainWrapper>
                <Label>Detail Listing</Label>
              <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                BSDId
                </InputLabel>
                <BootstrapInput value={film.BSDId} disabled placeholder='Enter BSDId' id="bootstrap-input" />
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                userId
                </InputLabel>
                <BootstrapInput disabled value={film.userId}  type='number' placeholder='Enter userId' id="bootstrap-input"  />
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                regionId
                </InputLabel>
                <BootstrapInput disabled value={film.regionId} placeholder='Enter regionId' id="bootstrap-input" />
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                title
                </InputLabel>
                <BootstrapInput disabled value={film.title} placeholder='Enter title' id="bootstrap-input" />
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Description
                </InputLabel>
                <BootstrapInput disabled value={film.description}  placeholder='Enter Description' id="bootstrap-input" />
            </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Description
                </InputLabel>
                <BootstrapInput disabled value={film.description}  placeholder='Enter Description' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Address
                </InputLabel>
                <BootstrapInput disabled value={film.address}  placeholder='Enter Address' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                Area
                </InputLabel>
                <BootstrapInput disabled value={film.area}  placeholder='Enter Area' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                status_listing
                </InputLabel>
                <BootstrapInput disabled value={film.status_listing}  placeholder='Enter status_listing' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                status_listing
                </InputLabel>
                <BootstrapInput disabled value={film.legal_status}  placeholder='Enter legal_status' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                furnishing
                </InputLabel>
                <BootstrapInput disabled value={film.furnishing}  placeholder='Enter furnishing' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                orientation
                </InputLabel>
                <BootstrapInput disabled value={film.orientation}  placeholder='Enter orientation' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                bathrooms
                </InputLabel>
                <BootstrapInput disabled value={film.bathrooms}  placeholder='Enter bathrooms' id="bootstrap-input" />
            </FormControl>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
                <InputLabel shrink htmlFor="bootstrap-input">
                bedrooms
                </InputLabel>
                <BootstrapInput disabled value={film.bedrooms}  placeholder='Enter bedrooms' id="bootstrap-input" />
            </FormControl>
            
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>     
                 <BootstrapInput disabled placeholder='Enter types id' id="bootstrap-input" />
                    </FormControl>
                    <nav aria-label="secondary mailbox folders">
                        <List>
                        <ListItem disablePadding >
                                <ListItemButton >
                                    <ListItemText primary={film.types.label} />
                                    <ListItemIcon>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                    
                        </List>
                    </nav>

            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
        
            <BootstrapInput disabled placeholder='Enter categories' id="bootstrap-input" />
            </FormControl>
            <nav aria-label="secondary mailbox folders">
                <List>
                <ListItem disablePadding >
                                <ListItemButton >
                                    <ListItemText primary={film.categories.label} />
                                    <ListItemIcon>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
             
                </List>
            </nav>
        
            <FormControl variant="standard" sx={{ width: '100%', marginTop: '5px' }}>
          <InputLabel shrink htmlFor="image-upload" style={{top: "-10px"}}>
            Upload Images
          </InputLabel>
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="image-upload"
            style={{ marginTop: '10px', width: '100%' }}
          >
            Choose Images
          </Button>
        </FormControl>

        <div style={{ marginTop: '20px' }}>
          {images.length > 0 && (
            <div>
              {images.map((image: any, index:number) => (
                <img
                  key={index}
                  src={`http://localhost:3000/assets/images/${image}`}
                  alt={`preview-${index}`}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
              ))}
            </div>
          )}
        </div>
                            
            </MainWrapper>
           <CloseIcon>
            <HighlightOffOutlinedIcon onClick={()=>  dispatch(setField(null))}/>
           </CloseIcon>
    </Container>

}