const form = document.getElementById('logonForm')
const msg = document.getElementById('helloMsg')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value

    try {
        const logon = await fetch('/api/v1/logon', {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: {
                "Content-type": "application/json"
            }
        })
        const logonData = await logon.json()
        const token = logonData.token

        if (!token) {
            msg.textContent = "Login failed"
            return
        }

        const hello = await fetch('/api/v1/hello', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const helloData = await hello.json()
        msg.textContent = helloData.msg
    } catch (error) {
        console.log(error)
        msg.textContent = 'Error logging in'
    }
})