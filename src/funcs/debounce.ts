export default function debounce(handler: (...args: any[]) => any, timeout: number = 500) {
    let timer: any;
    let wait: boolean = false;
    const setWait = () => {
        wait = !wait;
    }
    return (...args: any[]) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            if (wait) return;
            setWait();    
            const res = handler(...args);
            if (res instanceof Promise) {
                res.then((msg) => {
                    console.log(msg);
                }).catch((err) => {
                    console.log(err)
                    setWait();
                })
            } else {
                setWait();
            }
        }, timeout)
    }
}

