import CardMenuItem from './CardMenuItem';// Ruta relativa desde el componente
import RestaurantMenu from './Restaurant-Cart';
import RestaurantCart from './Restaurant-Cart2';
import RestaurantCart3 from './Restaurant-Cart3';


export default function HomeMenu() {
    return (
        <section className="">
            
            <div className="text-center mb-4">
                <h3 className="text-primary uppercase text-4xl font-bold">Nuestro menu</h3>
                {/* <h2 className="text-primary font-bold text-4xl">Menu</h2> */}
            </div>

            <div>
               
            {/* <RestaurantMenu/> */}
            {/* <RestaurantCart/> */}
            <RestaurantCart3/>
          
              
                
               

            </div>
        </section>

    );
}