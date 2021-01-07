async function UseFetch(url:string){
    return new Promise(resolve => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        resolve(Error('could not fetch the data for that resource'));
                    }
                    return res.json();
                })
                .then(data => {
                    //Green means Go!
                    resolve(data);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    }
                })
        }, 1000);
    })
}

export default UseFetch;