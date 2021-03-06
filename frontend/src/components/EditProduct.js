import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CATEGORIES } from "../constants"
import productActions from "../redux/actions/productActions"



const EditProduct = (props) => {

    const [product, setProduct] = useState({

    })
    const [error, setError] = useState({
        category: "",
        title: "",
        price: "",
        ml: "",
        pic: "",
        alcPct: "",
        stock: "",
        description: ""
    })
    const [alerta, setAlerta] = useState({
        errorCat: "",
        errorTitle: "",
        errorPrice: "",
        errorML: "",
        errorPIC: "",
        errorALC: "",
        errorSTOCK: "",
        errorDES: "",
    })
    const [send, setSend] = useState({
        status: false
    })

    useEffect(() => {
        const f = async () => {
            await props.dataProduct(props.props.match.params.id)

        }
        f()
        changeState()

    }, [props.productData.title])

    const changeState = () => {
        setProduct({
            category: props.productData.category,
            title: props.productData.title,
            price: props.productData.price,
            ml: props.productData.ml,
            rating: props.productData.rating,
            pic: props.productData.pic,
            alcPct: props.productData.alcPct,
            stock: props.productData.stock,
            description: props.productData.description
        })

    }

    const validation = product => {
        error.ok = true
        //RegEx
        const alphanum = RegExp(/^\w+$/)
        const num = RegExp(/\d./)
        const decimals = RegExp(/^([0-9]+(\.?[0-9]?[0-9]?)?)/)
        //category
        if (product.category === '') {

            error.category = 'Cannot be empty'
            error.ok = false

        }
        else error.category = ""
        //title
        if (product.title === "") {
            error.title = "Cannot be empty"
            error.ok = false
        } else {
            error.title = ""
        }
        //description
        if (product.description === '') {
            error.description = 'Cannot be empty'
            error.ok = false
        }

        // price
        if (product.price === '') {
            error.price = 'Cannot be empty'
            error.ok = false
        }
        else if (!decimals.test(product.price)) {
            error.price = 'Solo puede contener numeros con dos decimales'
            error.ok = false
        }
        else error.price = ''
        // Pic
        if (product.pic === '') {
            error.pic = 'Cannot be empty'
            error.ok = false
        } else {
            error.pic = ""
        }
        if (product.ml === '') {
            error.ml = 'Cannot be empty'
            error.ok = false
        }
        else if (!num.test(product.ml)) {
            error.ml = 'Only can contains numbers'
            error.ok = false
        }
        else error.ml = ''
        if (product.stock === '') {
            error.stock = 'Cannot be empty'
            error.ok = false
        }
        // else if (!num.test(product.stock)) {
        //     error.stock = 'Only can contains numbers'
        //     error.ok = false
        // }
        else error.stock = ''
        // alcPct

        if (product.alcPct === '') {
            error.alcPct = 'Cannot be empty'
            error.ok = false
        }

        else if (!decimals.test(product.alcPct)) {
            error.alcPct = 'Solo puede contener numeros con dos decimales '
            error.ok = false
        }
        else error.alcPct = ''
        //return
        return error.ok
    }

    const handleChange = e => {
        const valor = e.target.name === "pic" ? e.target.files[0] : e.target.value

        setProduct({
            ...product,
            [e.target.name]: valor
        })
    }
    const handleClick = async e => {
        e.preventDefault();
        send.status = true
        setSend({ status: true })
        if (validation(product)) {

            const fd = new FormData()
            fd.append("category", product.category)
            fd.append("price", product.price)
            fd.append("alcPct", product.alcPct)
            fd.append("ml", product.ml)
            fd.append("stock", product.stock)
            fd.append("description", product.description)
            fd.append("pic", product.pic)
            fd.append("rating", product.rating)
            fd.append("title", product.title)

            const id = props.props.match.params.id
            await props.editProduct(fd, id)

            setError({
                ...error,
                ok: true
            })
            setAlerta({
                errorCat: '',
                errorALC: '',
                errorML: '',
                errorPrice: '',
                errorSTOCK: '',
                errorDES: '',
                errorTitle: '',
                errorPIC: '',
            })

            setProduct({
                category: "",
                title: "",
                price: "",
                ml: "",
                pic: "",
                alcPct: "",
                stock: "",
                description: ""
            })
        }
        else {
            send.status = false
            setSend({ status: false })
            setError({
                ...error,
                ok: false
            })
            setAlerta({
                errorCat: error.category,
                errorALC: error.alcPct,
                errorML: error.ml,
                errorPrice: error.price,
                errorSTOCK: error.stock,
                errorDES: error.description,
                errorTitle: error.title,
                errorPIC: error.pic,


            })
        }

    }

    return (

        <>

            <div className="container">
                <form className="form">
                    <h2>Editar producto</h2>
                    <div className="inputBox">
                        <label for="category">Categoria:</label>
                        <select name="category" onChange={handleChange} value={product.category}>
                            <option> - Seleccionar Categoria - </option>
                            {CATEGORIES.map(category => {
                                return <option value={category.foto}>{category.nombre}</option>
                            })}
                        </select>
                        <span className="errorC">{alerta.errorCat}</span>
                    </div>
                    <div className="inputBox">
                        <label for="title">Titulo:</label>
                        <input type="text" name="title" onChange={handleChange} value={product.title}></input>
                        <span className="errorC">{alerta.errorTitle}</span>
                    </div>
                    <div className="inputBox">
                        <label for="description">Descripción:</label>
                        <input type="text" name="description" onChange={handleChange} value={product.description}></input>
                        <span className="errorC">{alerta.errorDES}</span>
                    </div>
                    <div className="inputBox">
                        <label for="price">Precio:</label>
                        <input type="number" name="price" onChange={handleChange} value={product.price}></input>
                        <span className="errorC">{alerta.errorPrice}</span>
                    </div>
                    <div className="inputBox">
                        <label for="stock">Stock:</label>
                        <input type="number" name="stock" onChange={handleChange} value={product.stock}></input>
                        <span className="errorC">{alerta.errorSTOCK}</span>
                    </div>
                    <div className="inputBox">
                        <label for="ml">Mililitros:</label>
                        <input type="number" name="ml" onChange={handleChange} value={product.ml}></input>
                        <span className="errorC">{alerta.errorML}</span>
                    </div>
                    <div className="inputBox">
                        <label for="alcPct">Porcentaje Alcoholico (%):</label>
                        <input type="number" name="alcPct" onChange={handleChange} value={product.alcPct}></input>
                        <span className="errorC">{alerta.errorALC}</span>
                    </div>
                    <div className="inputBox">
                        <label for="pic">Foto del producto:</label>
                        <input type="file" name="pic" onChange={handleChange} ></input>
                        <span className="errorC">{alerta.errorPIC}</span>
                    </div>

                    <button onClick={handleClick}>Enviar datos</button>
                </form>
            </div>

        </>
    )



}

const mapStateToProps = state => {
    return {
        productData: state.productReducer.productFound
    }
}

const mapDispatchToProps = {
    dataProduct: productActions.dataProduct,
    editProduct: productActions.editProduct
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)