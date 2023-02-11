import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';


import "./css/ProductForm.css";

export default function ProductForm() {

    const {resource, setResource} = useState({
        name:"",
        description:"",
        branch:"",
        year:"",
        subjectCode:"",
        price:0,
        type:"",
        link:"",
        image:null
    });

    const handleOnchange = (e) =>{
        setResource({...resource, [e.target.name]:e.target.value});
    }

    const submitForm = (e) =>{
        e.preventDefault();
        console.log(resource);
    }

    

  return (
    <div className='ProductForm'>
        <h1 style={{margin:'20px', fontSize:'32px'}}>Add Your Resources</h1>
          <Container fixed>
            <form onSubmit={submitForm}>
                <div className="fullWidth"> 
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            id="filled-required"
                            name="name"
                            label="Name"
                            variant="filled"
                            // value={resource.name}
                            onChange={handleOnchange}
                        /> 
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            id="filled-multiline-static"
                            multiline
                            rows={4}
                            label="Description"
                            variant="filled"
                            name='description'
                            // value={resource.description}
                            onChange={handleOnchange}
                        />
                    </FormControl>
                </div>
                <div className='formGrp'>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 260, width:300 }}>
                        <InputLabel id="demo-simple-select-filled-label">Branch</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="branch"
                            //   value={resource.branch}
                            onChange={handleOnchange}
                        >
                            {["CHEM", "MECH", "COMP", "ELEC", "EXTC", "CIVIL", "OTHER"].map((text, index)=>(
                                <MenuItem key={index} value={text}>{text}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 260, width:300 }}>
                        <InputLabel id="demo-simple-select-filled-label">Year</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="year"
                            //   value={resource.year}
                            onChange={handleOnchange}
                        >
                            {["FE", "SE", "TE", "BE"].map((text, index)=>(
                                <MenuItem key={index} value={text}>{text}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 300, width:340 }}>
                        <TextField
                            required
                            id="filled-required"
                            name="subjectCode"
                            label="Subject Code"
                            variant="filled"
                            //   value={resource.subjectCode}
                            onChange={handleOnchange}
                        /> 
                    </FormControl>
                </div>
                <div className='formGrp'>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 260, width: 340 }}>
                        <InputLabel htmlFor="filled-adornment-amount">Price</InputLabel>
                        <FilledInput
                            required
                            id="filled-adornment-amount"
                            name="price"
                            type='number'
                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                            //   value={resource.price}
                            onChange={handleOnchange}
                        />
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 260, width: 340 }}>
                        <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            name="type"
                            //   value={resource.type}
                            onChange={handleOnchange}
                        >
                            {["NOTES", "BOOKS", "PROJECT", "ASSIGNMENT"].map((text, index) => (
                                <MenuItem key={index} value={text}>{text}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </div>
                <div className="fullWidth">
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            id="filled-required"
                            name="link"
                            label="Resource Link"
                            variant="filled"
                            //   value={resource.link}
                            onChange={handleOnchange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            id="filled-multiline-static"
                            type='file'
                            rows={4}
                            variant="filled"
                            name='image'
                            accept='.jpeg, .jpg, .png, .bmp'
                            //   value={resource.image}
                            onChange={handleOnchange}
                        />
                    </FormControl>
                </div>
                <Button variant="contained" sx={{m:3, width:'50%'}}>Contained</Button>
            </form>
        </Container>
    </div>
  )
}
