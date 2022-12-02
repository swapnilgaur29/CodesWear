import React, { useState } from 'react'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import {
    Grid,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
    const [form, setForm] = useState({})

    const submitForm = (e) => {
        e.preventDefault();
        // request to add a product through fetch api post request
        // react toastify
        let a = fetch("http://localhost:3000/api/products")
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <ThemeProvider theme={theme}>
            {/* <style jsx global>{`
        footer{
          display:none;
        }
      `}</style> */}
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add a Product">
                            <Stack spacing={3}>

                                <TextField onChange={handleChange} value={form.title ? form.title : ""} name="title" label="Title" variant="outlined" />
                                <TextField onChange={handleChange} value={form.type ? form.type : ""} name="type" label="Type" variant="outlined" />
                                <TextField onChange={handleChange} value={form.size ? form.size : ""} name="size" label="Size" variant="outlined" />
                                <TextField onChange={handleChange} value={form.color ? form.color : ""} name="color" label="Color" variant="outlined" />
                                <TextField onChange={handleChange} value={form.slug ? form.slug : ""} name="slug" label="Slug" variant="outlined" />

                                <TextField
                                    onChange={handleChange}
                                    value={form.description ? form.description : ""}
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />
                            </Stack>
                            <br />
                            <Button onClick={submitForm} variant="outlined" mt={2}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>

                </Grid>
            </FullLayout >
        </ThemeProvider >
    );
}

export default Add