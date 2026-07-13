import React from "react";
import { useForm } from "../components/form/use-form";
import Input from "../components/controls/Input";
import CheckboxGenerator from "../components/controls/Checkbox";
import ButtonGenerator from "../components/controls/Button";
import { Form, useLoaderData, useNavigate, LoaderFunctionArgs } from "react-router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Alert, FormControl, Snackbar, Stack, Typography } from "@mui/material";
import { useRouter } from "../routes/hooks/use-router";
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

import type { User } from "../types";
import { fetchUserById, createUser, updateUser } from "../api/client";

type UserFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    isActive: boolean;
    addrLabel: string;
    addrLine1: string;
    addrLine2: string;
    addrCity: string;
    addrRegion: string;
    addrPostalCode: string;
    addrCountryCode: string;
};

const initialFieldValues: UserFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    isActive: true,
    addrLabel: "",
    addrLine1: "",
    addrLine2: "",
    addrCity: "",
    addrRegion: "",
    addrPostalCode: "",
    addrCountryCode: "",
};

function slideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export function userLoader({ params }: LoaderFunctionArgs) {
    return fetchUserById(Number(params.id));
}

export default function UserForm() {
    const user = useLoaderData() as User | undefined;
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

    const defaultAddress = user?.addresses.find((a) => a.isDefaultShipping) ?? user?.addresses[0];
    const flattenedUser: UserFormValues | undefined = user
        ? {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone ?? "",
            companyName: user.companyName ?? "",
            isActive: user.isActive,
            addrLabel: defaultAddress?.label ?? "",
            addrLine1: defaultAddress?.line1 ?? "",
            addrLine2: defaultAddress?.line2 ?? "",
            addrCity: defaultAddress?.city ?? "",
            addrRegion: defaultAddress?.region ?? "",
            addrPostalCode: defaultAddress?.postalCode ?? "",
            addrCountryCode: defaultAddress?.countryCode ?? "",
        }
        : undefined;

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFieldValues, flattenedUser);

    const navigate = useNavigate();

    const validateOnSubmit = () => {
        let temp: TODO = {};
        temp.firstName = values.firstName ? "" : "Mandatory Field";
        temp.lastName = values.lastName ? "" : "Mandatory Field";
        temp.email = /$^|.+@.+..+/.test(values.email) ? "" : "Email is not Valid";
        setErrors(temp);
        return Object.values(temp).every((x) => x === "");
    };

    const buildPayload = (): Omit<User, 'userId'> => ({
        email: values.email,
        passwordHash: user?.passwordHash ?? "demo-placeholder-hash",
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName || undefined,
        phone: values.phone || undefined,
        isActive: values.isActive,
        addresses: values.addrLine1
            ? [{
                label: values.addrLabel || "Primary",
                line1: values.addrLine1,
                line2: values.addrLine2 || undefined,
                city: values.addrCity,
                region: values.addrRegion || null,
                postalCode: values.addrPostalCode || undefined,
                countryCode: values.addrCountryCode,
                isDefaultShipping: true,
                isDefaultBilling: true,
            }]
            : [],
    });

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateOnSubmit()) {
            await createUser(buildPayload());
            navigate('/users', { replace: true });
        }
    };

    const handleUpdate = async () => {
        if (!user) return;
        await updateUser(user.userId, buildPayload());
        setNotice({ open: true, Transition: slideTransition });
        setTimeout(() => navigate('/users', { replace: true }), 1000);
    };

    const goBack = () => {
        router.back();
    };

    const handleClose = () => {
        setNotice({ ...notice, open: false });
    };

    return (
        <Paper sx={{ px: 5, py: 5 }}>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                User Form
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container rowSpacing={2} columnSpacing={4}>

                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth>
                            <Input required
                                label="First Name"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleInputChange}
                                error={(errors as TODO).firstName}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
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
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Company"
                            name="companyName"
                            value={values.companyName}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth>
                            <CheckboxGenerator
                                name="isActive"
                                label="Active"
                                value={values.isActive}
                                onChange={handleInputChange}
                            /> </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>
                            Address
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Address Line 1"
                            name="addrLine1"
                            value={values.addrLine1}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Address Line 2"
                            name="addrLine2"
                            value={values.addrLine2}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="City"
                            name="addrCity"
                            value={values.addrCity}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Region"
                            name="addrRegion"
                            value={values.addrRegion}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Postal Code"
                            name="addrPostalCode"
                            value={values.addrPostalCode}
                            onChange={handleInputChange}
                        /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                        <FormControl fullWidth><Input
                            variant="outlined"
                            label="Country Code"
                            name="addrCountryCode"
                            value={values.addrCountryCode}
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
                        px: 10
                    }}
                >
                    {user ? <ButtonGenerator text="Update" onClick={handleUpdate} />
                        : <ButtonGenerator text="Submit" type="submit" />
                    }
                    {user ? <ButtonGenerator text="Back" color={"default" as any} onClick={goBack} />
                        : <ButtonGenerator text="Reset" color={"default" as any} onClick={resetForm} />}
                </Stack>
            </Form>
            <Snackbar
                open={notice.open}
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

        </Paper>
    );
}
