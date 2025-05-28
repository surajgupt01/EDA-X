
export const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor:  '#3f3f46' , // Tailwind's bg-neutral-700
      color: 'white',
      borderColor: 'rgb(0,0,0)',     // Slightly lighter border
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#a1a1aa',   // Tailwind's hover neutral-400
      },
    }),
     
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#3f3f46', // bg-neutral-700
      color: 'white',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#52525b' // darker when selected
        : state.isFocused
        ? '#4b5563' // hover
        : '#3f3f46',
      color: 'white',
      cursor: 'pointer',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'white',
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#52525b',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: 'white',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: 'white',
      ':hover': {
        backgroundColor: '#71717a',
        color: 'white',
      },
    }),
  };
  