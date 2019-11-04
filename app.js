const app = document.getElementById('app');
const productsURL = "https://acme-users-api-rev.herokuapp.com/api/products"
const companiesURL = "https://acme-users-api-rev.herokuapp.com/api/companies"
const offeringsURL = "https://acme-users-api-rev.herokuapp.com/api/offerings"

const { render } = ReactDOM;
const { Component } = React;
const { HashRouter, Switch, Link, Route, Redirect } = ReactRouterDOM;

const Home = ({props, products}) => {
    return(
        <div>
        <h1>Home</h1>
            <p>we have {products.length} products with an average price of average Price  </p>
        </div>
    ) 
}

const Products = ({products, companies, offerings}) => {

    
    return (
        <div>
        <h1>Products</h1>
        <ul>
            {
                products.map(product => <li key = {product.name}>
                    <ul>
                        <li><b>Product: </b>{product.name}</li>
                        <li><b>Suggest Price: </b>{product.suggestedPrice}</li>
                        <li><b>Average Price: </b></li>
                        <li><b>Lowest  Price: </b></li>
                    </ul>
                    
                </li>)
            }
        </ul>
        </div>
    )
}

const Nav = (props) => {
    const path = window.location.pathname
    return (
        <nav>
            <Link to='/home' className = {path === '/home' ? selected : ''}>Home</Link>
            <Link to='/products' className = {path === '/products' ? selected : ''}>Products</Link>
        </nav>
    )
}

class App extends Component{
    constructor(){
        super();
        this.state = {
            products: [],
            companies:[],
            offerings:[],

        }
    }

    async componentDidMount(){
        const products = (await axios.get( productsURL)).data;
        const offerings = (await axios.get(companiesURL)).data;
        const companies = (await axios.get(offeringsURL)).data;
        console.log(products, offerings, companies)
        this.setState({ products, offerings, companies });
        }



    render(){
        const {products, companies, offerings, avgPrice} = this.state;
        return(
            <HashRouter>
                <Route component={Nav} />
                <Switch>
                    <Route path='/home' render={(props) => <Home products={products}/>}/>
                    <Route path= '/products' render = {(props)=> <Products {...props} products={products} companies = {companies} offerings = {offerings}/>} />
                </Switch>
            </HashRouter>
        )
    }


}


render(<App/>, app)

