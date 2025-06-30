import { Checkbox, CheckIcon, Combobox, Group, InputPlaceholder, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';



const MultiInput=(props:any)=> {
  const dispatch = useDispatch();
  useEffect(()=>{
    setData(props.options);
  },[])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({[props.title]: [value,search]}) );
    } else {
      dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v)=>
      v != val):[...value,val]}));
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val])
    }
  };

  const handleValueRemove = (val: string) =>{
    dispatch(updateFilter({[props.title]:value.filter((v)=> v!==val)}))
    setValue((current) => current.filter((v) => v !== val));
  }

  const values = value
    .slice(0, 1)
    .map((item) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = data .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
    <Combobox.Option  value={item} key={item} active={value.includes(item)} >
      <Group gap="sm">
        <Checkbox
        size='xs' color='bright-sun.4'
          checked={value.includes(item)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span className='text-mine-shaft-300'>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal>
      <Combobox.DropdownTarget>
        <PillsInput  variant='unstyled' rightSection={<IconSelector/>} onClick={() => combobox.toggleDropdown()} leftSection={
            <div className='text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2'><props.icon/></div>
        }>
           <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length > 1 && (
                  <Pill>+{value.length -  1} more</Pill>
                )}
              </>
            ) : (
              <InputPlaceholder className='text-mine-shaft-300'>{props.title}</InputPlaceholder>
            )}

          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={props.title}
          />
        <Combobox.Options >
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MultiInput;