import React from "react";
import { useForm } from "../components/form/use-form";
import Input from "../components/controls/Input";
import RadioGroupGenerator from "../components/controls/RadioGroup";
import Select from "../components/controls/Select";
import * as service from "../services/agentService";
import CheckboxGenerator from "../components/controls/Checkbox";
import ButtonGenerator from "../components/controls/Button";
import { Form, useNavigate, useLoaderData } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Alert, FormControl, Snackbar, Stack, Typography } from "@mui/material";
import { useRouter } from "../routes/hooks/use-router";
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

const initialFieldValues: Agent = {
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    status: "",
    avatarUrl: "",
    role: "",
    company: "",
    isVerified: false
};

const radioList = [
    { id: "active", title: "Active" },
    { id: "locked", title: "Locked" },
];

const checkboxList = [
    { id: "1", title: "yes" },
    { id: "2", title: "no" }
];

function slideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export default function AgentForm() {
    const agent = useLoaderData();
    const router = useRouter();
    const [notice, setNotice] = React.useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        Transition: Fade,
    });
    console.log(` match => ${agent}`)
    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        currentField
    } = useForm(initialFieldValues, agent);

    const navigate = useNavigate();


    const validateOnSubmit = () => {
        let temp: TODO = {};
        temp.firstName = values.firstName ? "" : "Mandatory Field";
        temp.lastName = values.lastName ? "" : "Mandatory Field";
        temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Email is not Valid";
        temp.mobile = values.mobile.length > 9 ? "" : "Min 10 numbers required";
        temp.city = values.city ? "" : "Mandatory Field";
        temp.state = values.state ? "" : "Mandatory Field";
        temp.role = values.role? "" : "Mandatory Field";
        temp.status = values.status? "" : "Mandatory Field";

        setErrors(
            temp
        );
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        // const handleSubmit = () => {
        e.preventDefault();
        if (validateOnSubmit()) {
            values.name = `${values.firstName} ${values.lastName}`
            values.location = `${values.city} ${values.state}`

            // window.alert("Submitting...");
            console.log(values)
            service.addItem(values);
            navigate('/agents', { replace: true })
        }
    };

    const handleUpdate = (e: React.SyntheticEvent) => {

        service.updateItem(values);
    
        setNotice({
            open: true,
            Transition: slideTransition
        })
        setTimeout(
            () => { navigate('/agents', { replace: true }) }, 1000)
    };

    const goBack = (e: React.SyntheticEvent) => {
        router.back();
    };

    const handleClose = () => {
        setNotice({
            ...notice,
            open: false,
        });
    };
    return (
        <Paper sx={{ px: 5, py: 5 }}>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Agent Form
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container  rowSpacing={2} columnSpacing={4}>
                    <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <FormControl fullWidth >
                            <Input required
                                label="Company"
                                name="company"
                                value={values.company}
                                onChange={handleInputChange}
                                error={(errors as TODO).company}
                            /> </FormControl></Grid>
                    <Grid size={{ xs: 12, md: 3, lg: 3 }}>

                        <FormControl fullWidth>
                            <Input required
                                label="First Name"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange}
                                error={(errors as TODO).firstName}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                        <FormControl fullWidth>
                            <Input required
                                variant="outlined"
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleInputChange}
                                error={(errors as TODO).lastName}
                            /> </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                        <FormControl fullWidth>
                            <Input
                                required
                                variant="outlined"
                                label="e-mail"
                                name="email"
                                value={values.email}
                                type="email"
                                onChange={handleInputChange}
                                error={(errors as TODO).email}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="mobile"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            error={(errors as TODO).mobile}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                        <FormControl fullWidth><Input required
                            variant="outlined"
                            label="city"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="State"
                            name="state"
                            value={values.state}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl style={{ minWidth: '10em' }}>
                            <Select
                                name="role"
                                label="Role"
                                value={values.role}
                                onChange={handleInputChange}
                                options={service.roleArray()}
                                error={(errors as TODO).role}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth>
                            <RadioGroupGenerator 
                                name="status"
                                label="Status"
                                value={values.status}
                                onChange={handleInputChange}
                                items={radioList}
                            /> 
                                
                            </FormControl>
                    </Grid>
                    
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                        <FormControl fullWidth>
                            <CheckboxGenerator
                                name="isVerified"
                                label="Is Verified"
                                value={values.isVerified}
                                onChange={handleInputChange}
                                options={checkboxList}

                            /> </FormControl>
                    </Grid>
                </Grid>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        px: 10
                    }}
                >
                    {agent ? <ButtonGenerator text="Update" onClick={handleUpdate} />
                        : <ButtonGenerator text="Submit" type="submit" />
                    }
                    {agent ? <ButtonGenerator text="Back" color="default" onClick={goBack} />
                        : <ButtonGenerator text="Reset" color="default" onClick={resetForm} />}
                </Stack>
            </Form >
            <Snackbar
                open={notice.open}
                // onClose={handleClose}
                TransitionComponent={notice.Transition}
                message="Operation is done successfully"
                key={notice.Transition.name}
                autoHideDuration={1000}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Operation is done successfully!
                </Alert>
            </Snackbar>

        </Paper >
    );
}


export function agentLoader({ params }: TODO) {
    const agent = service.getItemById(params.id);
    if (!agent) throw new Response("/not-found", { status: 404 });
    return agent;
}