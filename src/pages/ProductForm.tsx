import React from "react";
import { useForm } from "../components/form/use-form";
import Input from "../components/controls/Input";
import CheckboxGenerator from "../components/controls/Checkbox";
import ButtonGenerator from "../components/controls/Button";
import { Form, useLoaderData, useNavigate, LoaderFunctionArgs } from "react-router";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Alert, FormControl, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "../routes/hooks/use-router";
import Slide, { SlideProps } from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';
import { Iconify } from "../components/iconify";

import type { Category, Product, ProductImage, ProductVariant } from "../types";
import { fetchCategories, fetchProductById, createProduct, updateProduct, deleteProduct } from "../api/client";

type ProductFormValues = {
    name: string;
    slug: string;
    description: string;
    categoryId: number | "";
    isActive: boolean;
    images: ProductImage[];
    variants: ProductVariant[];
};

const initialFieldValues: ProductFormValues = {
    name: "",
    slug: "",
    description: "",
    categoryId: "",
    isActive: true,
    images: [],
    variants: [{ variantId: 0, sku: "", name: "Default", price: 0, currency: "USD", isActive: true, quantityOnHand: 0 }],
};

function slideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

export async function productFormLoader({ params }: LoaderFunctionArgs) {
    const categories = await fetchCategories();
    if (!params.id) {
        return { product: undefined, categories };
    }
    const product = await fetchProductById(Number(params.id));
    return { product, categories };
}

export default function ProductForm() {
    const { product, categories } = useLoaderData() as { product: Product | undefined; categories: Category[] };
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

    const selectedData: ProductFormValues | undefined = product
        ? {
            name: product.name,
            slug: product.slug,
            description: product.description ?? "",
            categoryId: product.categoryId,
            isActive: product.isActive,
            images: product.images,
            variants: product.variants,
        }
        : undefined;

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFieldValues, selectedData);

    const navigate = useNavigate();

    const validateOnSubmit = () => {
        let temp: TODO = {};
        temp.name = values.name ? "" : "Mandatory Field";
        temp.categoryId = values.categoryId ? "" : "Mandatory Field";
        setErrors(temp);
        return Object.values(temp).every((x: TODO) => x === "");
    };

    const buildPayload = (): Omit<Product, 'productId'> => {
        const category = categories.find((c) => c.categoryId === values.categoryId);
        return {
            categoryId: values.categoryId as number,
            categoryName: category?.name ?? "",
            name: values.name,
            slug: values.slug || values.name.toLowerCase().trim().replace(/\s+/g, "-"),
            description: values.description || undefined,
            isActive: values.isActive,
            images: values.images,
            variants: values.variants,
        };
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (validateOnSubmit()) {
            await createProduct(buildPayload());
            navigate('/products', { replace: true });
        }
    };

    const handleUpdate = async () => {
        if (!product) return;
        await updateProduct(product.productId, buildPayload());
        setNotice({ open: true, Transition: slideTransition });
        setTimeout(() => navigate('/products', { replace: true }), 1000);
    };

    const handleDelete = async () => {
        if (!product) return;
        await deleteProduct(product.productId);
        navigate('/products', { replace: true });
    };

    const goBack = () => {
        router.back();
    };

    const handleClose = () => {
        setNotice({ ...notice, open: false });
    };

    const updateImage = (index: number, patch: Partial<ProductImage>) => {
        const images = values.images.map((img: ProductImage, i: number) => (i === index ? { ...img, ...patch } : img));
        setValues({ ...values, images });
    };

    const addImage = () => {
        setValues({ ...values, images: [...values.images, { url: "", altText: "", sortOrder: values.images.length }] });
    };

    const removeImage = (index: number) => {
        setValues({ ...values, images: values.images.filter((_: TODO, i: number) => i !== index) });
    };

    const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
        const variants = values.variants.map((v: ProductVariant, i: number) => (i === index ? { ...v, ...patch } : v));
        setValues({ ...values, variants });
    };

    const addVariant = () => {
        setValues({
            ...values,
            variants: [...values.variants, { variantId: 0, sku: "", name: "", price: 0, currency: "USD", isActive: true, quantityOnHand: 0 }],
        });
    };

    const removeVariant = (index: number) => {
        setValues({ ...values, variants: values.variants.filter((_: TODO, i: number) => i !== index) });
    };

    return (
        <Paper sx={{ px: 5, py: 5 }}>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                Product Form
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container rowSpacing={2} columnSpacing={4}>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <FormControl fullWidth>
                            <Input required
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                error={(errors as TODO).name}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <FormControl fullWidth>
                            <Input
                                variant="outlined"
                                label="Slug (optional, derived from name)"
                                name="slug"
                                value={values.slug}
                                onChange={handleInputChange}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                required
                                label="Category"
                                name="categoryId"
                                value={values.categoryId}
                                onChange={handleInputChange}
                                error={!!(errors as TODO).categoryId}
                                helperText={(errors as TODO).categoryId}
                            >
                                {categories.map((c) => (
                                    <MenuItem key={c.categoryId} value={c.categoryId}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                            <Input
                                variant="outlined"
                                label="Description"
                                name="description"
                                value={values.description}
                                onChange={handleInputChange}
                                multiline
                                rows={2}
                            /> </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <FormControl fullWidth>
                            <CheckboxGenerator
                                name="isActive"
                                label="Active"
                                value={values.isActive}
                                onChange={handleInputChange}
                            /> </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 1 }} />
                        <SectionHeader title="Images" onAdd={addImage} addLabel="Add Image" />
                    </Grid>

                    {values.images.map((image: ProductImage, index: number) => (
                        <React.Fragment key={index}>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    value={image.url}
                                    onChange={(e) => updateImage(index, { url: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    label="Alt Text"
                                    value={image.altText ?? ""}
                                    onChange={(e) => updateImage(index, { altText: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 10, md: 2 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Sort Order"
                                    value={image.sortOrder}
                                    onChange={(e) => updateImage(index, { sortOrder: Number(e.target.value) })}
                                />
                            </Grid>
                            <Grid size={{ xs: 2, md: 1 }}>
                                <IconButton color="error" onClick={() => removeImage(index)}>
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    ))}

                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 1 }} />
                        <SectionHeader title="Variants" onAdd={addVariant} addLabel="Add Variant" />
                    </Grid>

                    {values.variants.map((variant: ProductVariant, index: number) => (
                        <React.Fragment key={index}>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="SKU"
                                    value={variant.sku}
                                    onChange={(e) => updateVariant(index, { sku: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Variant Name"
                                    value={variant.name}
                                    onChange={(e) => updateVariant(index, { name: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Price"
                                    value={variant.price}
                                    onChange={(e) => updateVariant(index, { price: Number(e.target.value) })}
                                />
                            </Grid>
                            <Grid size={{ xs: 6, md: 2 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Qty on Hand"
                                    value={variant.quantityOnHand}
                                    onChange={(e) => updateVariant(index, { quantityOnHand: Number(e.target.value) })}
                                />
                            </Grid>
                            <Grid size={{ xs: 10, md: 1 }}>
                                <TextField
                                    fullWidth
                                    label="Currency"
                                    value={variant.currency}
                                    onChange={(e) => updateVariant(index, { currency: e.target.value })}
                                />
                            </Grid>
                            <Grid size={{ xs: 2, md: 1 }}>
                                <IconButton
                                    color="error"
                                    onClick={() => removeVariant(index)}
                                    disabled={values.variants.length <= 1}
                                >
                                    <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                            </Grid>
                        </React.Fragment>
                    ))}

                </Grid>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        px: 10,
                        mt: 3,
                    }}
                >
                    {product ? <ButtonGenerator text="Update" onClick={handleUpdate} />
                        : <ButtonGenerator text="Submit" type="submit" />
                    }
                    {product && <ButtonGenerator text="Delete" color="error" onClick={handleDelete} />}
                    {product ? <ButtonGenerator text="Back" color={"default" as any} onClick={goBack} />
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

function SectionHeader({ title, onAdd, addLabel }: { title: string; onAdd: () => void; addLabel: string }) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle1">{title}</Typography>
            <ButtonGenerator text={addLabel} size="small" onClick={onAdd} />
        </Stack>
    );
}
