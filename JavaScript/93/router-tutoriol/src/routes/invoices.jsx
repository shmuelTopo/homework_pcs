import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

  
export default function Invoices() {
    let invoices = getInvoices();
    let [searchParams, setSearchParams] = useSearchParams();
    let [searchParams2, setSearchParams2] = useSearchParams();

  
    const filteredInvoices = invoices.filter(invoice => {
        let filter = searchParams.get("filter");
        if (!filter) return true;

        console.log(invoice.name, filter.toLowerCase());

        const name = invoice.name.toLowerCase();
        return name.startsWith(filter.toLowerCase()) || 
        name.split(' ').some(word => word.startsWith(filter.toLowerCase()));
    });
    
    return (
      <div style={{ display: "flex" }}>
        <nav style={{ borderRight: "solid 1px", padding: "1rem",}}>
          <label>
            Search
            <input
              style={{display: 'block', marginBottom: '1rem'}}
              value={searchParams.get("filter") || ""}
              onChange={(event) => {
                let filter = event.target.value;
                filter ? setSearchParams({filter}) : setSearchParams({});
              }} 
            />
          </label>

          {filteredInvoices.map((invoice) => (
              <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/invoices/${invoice.number}`}
                key={invoice.number}
              >
                {invoice.name}
              </NavLink>
      
            ))}
        </nav>
        <Outlet />
      </div>
    );
  }