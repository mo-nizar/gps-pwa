import React, {FC} from 'react';
import '@styles/components/Partners.scss';


interface Partners{
  id?: null | string;
  title?: null | string;
  imageUrl?: null | string;
};


interface PartnersProps{
  partners: Partners[];
};

const Partners: FC<PartnersProps>= ({ partners}) => {
    
  return (
    <div className='container'>
      {partners.map((item, idx)=>{

        return(
          <div key={idx}>
            <img src={item.imageUrl || undefined}></img>
          </div>
        )
        
        })
      }
    </div>
    
  )
}

export default Partners