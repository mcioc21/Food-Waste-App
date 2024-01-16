import { ChangeEvent, useEffect, useState } from "react"
import { User } from "../models/User"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from "react-router-dom";
import { post, get, put, last_insert_row_id } from "../api/Calls";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Product } from "../models/Product";
import _, { last } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';

export default function UserEdit() {
    //const user_id = parseInt(last_insert_row_id());
    //const [user_id, setUser_id] = useState(0);



    const [user, setUser] = useState<User>({ 
        UserId: 0,
        UserName: "", 
        UserEmail: "", 
        UserPassword: "",
        UserProductList: [] });

    const [product, setProduct] = useState<Product>({ 
        ProductId: 0, 
        ProductName: "", 
        ProductExpiry: new Date(),
        ReservedBy: "" ,
        UserId: 0});

    const [open, setOpen] = useState(false);

    const [isProductNew, setIsProductNew] = useState<boolean>(true);
    const [productIndex, setProductIndex] = useState<number>(0);

    const navigation = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        get("/last_insert_row_id").then(d => { console.log(d); setUser({ ...user, UserId: d.count + 1 }); });
        if(!id)
            return;
        
        get("/user/", null, id).then(d => { setUser(d);
             });
    }, [])

    function onChangeUser(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        setUser({ ...user, [event.target.name]: event.target.value });
    }

    async function saveUser() {
        if(!id)
            await post("/user", user);
        else
            await put("/user", user.UserId, user);

        navigation("/User");
    }

    const handleClickOpen = () => {
        setOpen(true);
        setProduct({ 
            ProductId: 0,
            ProductName: "",
            ProductExpiry: new Date(),
            ReservedBy: "",
            UserId: id ?  Number(id) : 0
        })
        setIsProductNew(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    function onChangeProduct(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    function editProduct(index: number) {
        setOpen(true);
        const currentProduct = user.UserProductList[index];
        setProduct(currentProduct);
        setIsProductNew(false);
        setProductIndex(index);
    }

    function deleteProduct(index: number) {
        const newProduct = _.cloneDeep(user.UserProductList);
        newProduct.splice(index, 1);
        setUser({ ...user, UserProductList: newProduct });
    }

    function saveProduct() {
        handleClose();
        if(isProductNew) {
            const newProduct = _.cloneDeep(user.UserProductList);
            newProduct.push(product);
            setUser({ ...user, UserProductList: newProduct });
        } else {
            let newProduct = _.cloneDeep(user.UserProductList);
            newProduct = newProduct.map((p, index) => (index === productIndex ? product : p));
            setUser({ ...user, UserProductList: newProduct });
        }
        setOpen(false);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="UserName"
                    size="small"
                    value={user.UserName}
                    onChange={onChangeUser}
                    name="UserName"
                />
                <TextField
                    label="UserEmail"
                    size="small"
                    value={user.UserEmail}
                    onChange={onChangeUser}
                    name="UserEmail"
                />
            </div>
            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={saveUser}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    variant="contained"
                    color="error"
                    onClick={() => navigation(-1)}
                >
                    Cancel
                </Button>
            </div>

            <div>
                <h1>User Products</h1>

                <div>
                    <Button
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        Add new product
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>User Product</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                            >
                                <TextField
                                    label="ProductName"
                                    value={product.ProductName}
                                    onChange={onChangeProduct}
                                    name="ProductName"
                                />
                                <TextField
                                    label="ReservedBy"
                                    value={product.ReservedBy}
                                    onChange={onChangeProduct}
                                    name="ReservedBy"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveProduct}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Reserved By</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.UserProductList.map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell>{row.ProductName}</TableCell>
                                    <TableCell>{row.ReservedBy}</TableCell>
                                    <TableCell><Button startIcon={<EditIcon/>} color="success" onClick={() => editProduct(index)}/></TableCell>
                                    <TableCell><Button startIcon={<CancelIcon/>} color="error" onClick={() => deleteProduct(index)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );
}