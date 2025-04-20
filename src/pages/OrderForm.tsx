import React from "react";
import { useForm } from "../components/form/use-form";
import Input from "../components/controls/Input";
import RadioGroupGenerator from "../components/controls/RadioGroup";
import * as service from "../services/orderService";
import CheckboxGenerator from "../components/controls/Checkbox";
import ButtonGenerator from "../components/controls/Button";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
    Alert, FormControl, Snackbar, Stack, Step, StepLabel, Stepper, Typography
} from "@mui/material";
import { useRouter } from "../routes/hooks/use-router";
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { TransitionProps } from "@mui/material/transitions";


const initialFieldValues: Order = {
    id: "",
    orderId: "",
    itemSummary: "",

    totalPrice: "",
    discount: "",
    shippingAddress: "",
    billingAddress: "",
    status: "",
    isDelayed: false,
    customer: ""

};

const membershipArray = [
    { id: "vip", title: "VIP" },
    { id: "standard", title: "Standard" },
];

const checkboxList = [
    { id: "1", title: "yes" },
    { id: "2", title: "no" }
];

const Steps = [
    'packing',
    'shipping',
    'customs-clearance',
    'delivered'
];

const StepLabels = [
    'Packaging',
    'Shipping',
    'Customs Clearance',
    'Delivered'
];


function slideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export default function OrderForm() {
    const order = useLoaderData();
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

    console.log(` editing  => ${order}`)
    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        currentField
    } = useForm(initialFieldValues, order);

    const step = !values.id ? 0 : (Steps.indexOf(values.status) + 1)

    const navigate = useNavigate();

    const isNewItem = !values.id ? true: false;


    const validateOnSubmit = () => {
        let temp: TODO = {};
        temp.itemSummary = values.itemSummary ? "" : "Mandatory Field";
        temp.totalPrice = values.totalPrice ? "" : "Mandatory Field";
        temp.customer = values.customer ? "" : "Mandatory Field";
        temp.shippingAddress = values.shippingAddress ? "" : "Mandatory Field";
    
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        // const handleSubmit = () => {
        e.preventDefault();
        if (validateOnSubmit()) {
            values.item = `${values.firstName} ${values.lastName}`
            values.location = `${values.city} ${values.state}`
            console.log(values)
            service.addItem(values);
            navigate('/orders', { replace: true })
        }
    };

    const handleUpdate = (e: React.SyntheticEvent) => {

        service.updateItem(values);

        setNotice({
            open: true,
            Transition: slideTransition
        })
        setTimeout(
            () => { navigate('/orders', { replace: true }) }, 1000)
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
                Order Form
            </Typography>
            <Stack sx={{ py: 10 }}>
                <Stepper activeStep={step} alternativeLabel>
                    {StepLabels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

            </Stack>
            <Form onSubmit={handleSubmit}>
                <Grid container rowSpacing={2} columnSpacing={4}>

                    <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <FormControl fullWidth>
                            <Input disabled = {!isNewItem}
                                variant="outlined" // {order? "filled": "outlined"}
                                label="Item Summary"
                                name="itemSummary"
                                value={values.itemSummary}
                                error={(errors as TODO).itemSummary}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                   
                    <Grid size={{ xs: 12, md: 3, lg: 3 }}>

                        <FormControl fullWidth>
                            <Input
                               disabled = {!isNewItem}
                               variant="outlined" // 
                                label="Promote Code"
                                name="promoteCode"
                                value={values.promoteCode}
                                onChange={handleInputChange}
                                error={(errors as TODO).promoteCode}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                        <FormControl fullWidth>
                            <Input
                                disabled = {!isNewItem}
                                variant="outlined" // 
                                label="Total Price"
                                name="totalPrice"
                                type="number"
                                value={values.totalPrice}   
                                onChange={handleInputChange}
                                error={(errors as TODO).totalPrice}
                            /> </FormControl>
                    </Grid>


                    {/* ------------------------------------------------*/}
                    <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                        <FormControl fullWidth >
                            <Input disabled = {!isNewItem}
                                variant="outlined" // 
                                label="Shipping To"
                                name="shippingAddress"
                                value={values.shippingAddress}
                                onChange={handleInputChange}
                                error={(errors as TODO).shippingAddress}
                            /> </FormControl></Grid>
                   
                    <Grid size={{ xs: 12, md: 3, lg: 3 }}>
                        <FormControl fullWidth>
                            <Input disabled = {!isNewItem}
                                variant="outlined"
                                label="Customer"
                                name="customer"
                                value={values.customer}
                                onChange={handleInputChange}
                                error={(errors as TODO).customer}
                            /> </FormControl>
                    </Grid>
                   
                   
                    
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>

                        <FormControl fullWidth>
                            <CheckboxGenerator
                                item="isDelayed"
                                label="Is delayed"
                                value={values.isDelayed}
                                name="isDelayed"
                                onChange={handleInputChange}

                            /> </FormControl>
                    </Grid>




                </Grid>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        py: 5,
                        px: 10
                    }}
                >
                    {order ? <ButtonGenerator text="Update" onClick={handleUpdate} />
                        : <ButtonGenerator text="Submit" type="submit" />
                    }
                    {order ? <ButtonGenerator text="Back" color="default" onClick={goBack} />
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


export function orderLoader({ params }: TODO) {
    const order = service.getItemById(params.id);
    if (!order) throw new Response("/not-found", { status: 404 });
    return order;
}
