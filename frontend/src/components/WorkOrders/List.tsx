import styles from './List.module.css';

type ListProps<T> = {
    list: T[];
    render: (item: T) => React.ReactNode;
};

function List<T>({ list, render }: ListProps<T>) {
    const tblHeaders: string[] = [];

    for (const key in list[0]) {
        tblHeaders.push(key);
    }

    return (
        <table className={styles.woTable}>
            <thead>
                <tr>
                    {tblHeaders.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {list.map((item) => (
                    <>{render(item)}</>
                ))}
            </tbody>
        </table>
    );
}

export default List;
