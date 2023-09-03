import { CategoryProps } from "../../types";



function Category( { props, showCatModal } : { props: CategoryProps, showCatModal: Function }  ) {

  const CatIcon = props.icon;

  return (
    <div className="w-28 h-32 border border-primary  rounded-lg mx-2 my-2 flex flex-col justify-center items-center cursor-pointer hover:shadow-xl" onClick={ () => showCatModal(props.title) }>
      <CatIcon className="w-8 h-8 mt-8" stroke={props.color}   />
      <p className="my-2 text-sm font-semibold">{props.title}</p>
    </div>
  )
}

export default Category
