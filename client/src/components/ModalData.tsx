
function ModalData( { data } : { data: any } ) {

  return (
    <div className="flex flex-col mx-6">
        {
            Object.keys(data).map((keyVal) => {
                
                if ( !data[keyVal] || keyVal=="id" || keyVal=="_id" ) return null;

                if ( keyVal == "references" ) {
                    return  <div key={keyVal} className="flex my-1 text-sm" >
                                <p className="w-40 text-[#8c9497] font-semibold">{keyVal[0].toUpperCase()+keyVal.slice(1)+" :"}</p> 
                                <p>{"["}{data[keyVal].map( (it:string) => <>{it}</>)} {"]"}</p>
                            </div>
                }
                //  return ( <> { "["}  {data[keyVal].map((it:string) => <> {it} </>)} {"]"}</> );
                return (
                    <div key={keyVal} className="flex my-1 text-sm" >
                        <p className="w-40 text-[#8c9497] font-semibold">{keyVal[0].toUpperCase()+keyVal.slice(1)+" :"}</p> 
                        <p>{data[keyVal].toString()[0].toUpperCase()+data[keyVal].toString().slice(1)}</p>
                    </div>
                ) 
            })
        }
        <hr className="my-3"/>
    </div>
  )
}

export default ModalData