export const ListboxWrapper = ({children}) => (
    <div className="w-full max-w-[750px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
            {/* <ListboxWrapper>
        <Listbox items={items} aria-label="overzicht">
          {(item) => (
            <ListboxItem key={item.id}>
              <div className="flex flex-cols-3">
                <div className="p-2">
                  {DateToDDMMYYYY(fromUnixTime(item.datum))}
                </div>
                <div className="text-right p-2">
                  &euro; {item.bedrag.toString()}
                </div>
                <div className="p-2 text-wrap">{item.mededeling}</div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </ListboxWrapper> */}
    </div>
  );