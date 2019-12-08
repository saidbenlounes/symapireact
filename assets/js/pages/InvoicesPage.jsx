import React, { useEffect, useState } from 'react';
import moment from "moment";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const STATUS_CLASSES ={
    PAID:"success",
    SENT:"info",
    CANCELLED:"danger"
};

const STATUS_LABELS ={
    PAID:"Payée",
    SENT:"Envoyée",
    CANCELLED:"Annulée"
};
const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);
    const  [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const[loading, setLoading] = useState(true);
    const fetchInvoices = async()=>{
        try{
            const data = await InvoicesAPI.findAll();

            setInvoices(data);
            setLoading(false);
                      
        } catch(error){
            toast.error("erreur lors de chargement des factures");
        }

   
    };


    useEffect(() => {
        fetchInvoices();
      }, []);

      const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
   
    
    const handleSearch = event =>{
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    } 
     const handleDelete = async id =>{
        const originalCustomers = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesAPI.delete(id);
            toast.success("la facture a bien ete suprimé")  
          } catch (error) {
            setInvoices(originalCustomers);
            toast.error("un erreur est survenue lors de la");
           
          }

     }
    
    const itemsPerPage = 10;
    const filteredInvoices = invoices.filter(
          i =>
          i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          i.customer.lastName.toLowerCase().includes(search.toLowerCase())  ||
          i.amount.toString().includes(search.toLowerCase()) ||
          STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
          
        )
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    const formatDate = str =>moment(str).format("DD/MM/YYYY")
    return ( <>
        

        <div className="mb-2 d-flex justify-content-between align-item-center">
        <h1>Listes des factures</h1>
			<Link to="/invoices/new" className="btn btn-primary">Créer une facture</Link>
		</div>
        <div className="form-groups">
		<input className="form-control" type="text" onChange={handleSearch} value={search} placeholder="Rechercher..."/>
		</div>
            <table className="table table-hover">
              <thead>
                  <tr>
                      <th>Numero de facture</th>
                      <th>client</th>
                      <th className="text-center">Date d'envoie</th>
                      <th className="text-center">Statut</th>
                      <th className="text-center">Montant</th>
                      <th></th>
                  </tr>
              </thead>  
              {!loading &&  <tbody>
                  {paginatedInvoices.map(invoice =><tr key={invoice.id}>
                    
                      <td>{invoice.chrono}</td>
                      <td>
                      <Link to={"/customers/" + invoice.customer.id}>{invoice.customer.lastName} {invoice.customer.firstName}</Link>

                      </td>
                      <td className="text-center">{formatDate(invoice.sentAt)}</td>
                      <td className="text-center">
                          <span className={"badge badge-"+ STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                      </td>
                      <td className="text-center">{invoice.amount.toLocaleString()}</td>
                      <td>
                          <Link to={"/invoices/"+ invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                          <button className="btn btn-sm btn-danger"  onClick={()=>handleDelete(invoice.id)} >Supprimer</button>
                      </td>
                  </tr>
                )}
                 
              </tbody>}
            </table>
            {loading && <TableLoader />}
            { itemsPerPage < filteredInvoices.length && (
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length} onPageChanged={handlePageChange} />

            ) }
     </>
     );
}
 
export default InvoicesPage;