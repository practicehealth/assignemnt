
const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const suffix = [ 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th'  ];
function Calender( { data } : { data: string } ) {

    const dateVal = new Date(data);
    
    const year = dateVal.getUTCFullYear()
    const mnth = dateVal.getMonth();
    const date = dateVal.getDate();
    const day = dateVal.getDay();
    let suff;
    if ( 11<=date && date<=13 ) suff = 'th';
    else suff = suffix[date%10-1];

    return (
        <div className=" w-36 text-center border border-black rounded-lg overflow-hidden">
            <div className="h-6 bg-accent text-center w-full">
                { year }
            </div>
            <div className="flex flex-col h-full">
                <p className="text-xl font-semibold py-2">{months[mnth]}</p>
                <p className="font-medium py-1">{date}{suff } {days[day].slice(0,3)}</p>
            </div>
        </div>
    )
}

export default Calender