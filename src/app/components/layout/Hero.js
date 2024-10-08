import Image from "next/image";
import Right from './icons/right';
export default function Hero() {
    return (
        
            <section className="hero">
                <div className=" py-12">
                    <h1 className="text-4xl font-semibold leading-relaxed">Mejor<br/> por porciones</h1>
                    <p className="my-4 text-clip  text-gray-600">
                    ¿Media porción? Perfecta para cuando finges estar a dieta.
                    </p>
                    <div className="flex gap-10 my-8">
                        <button className="bg-primary flex items-center gap-2 text-white px-4 py-2 rounded-full">
                             Pedir ahora
                            <Right/>
                        </button>
                        <button className="flex items-center gap-2 test-black border px-8 py-2 rounded-full">
                             Ver mas
                        <Right/>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Image src={'/imagen1.png'} layout={'fill'} objectFit={'contain'} alt={'Porcion'}/>
                </div>
                
            
            </section>
        
        
    );
}

