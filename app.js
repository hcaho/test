const validUsername = 'user';
const validPassword = 'password';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        loadFiles();
    } else {
        alert('Invalid username or password');
    }
}

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            storeFile(file.name, fileContent);
            displayFile(file.name, fileContent);
        };
        reader.readAsDataURL(file);
    } else {
        alert('No file selected');
    }
}

function storeFile(fileName, fileContent) {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.push({ name: fileName, content: fileContent });
    localStorage.setItem('files', JSON.stringify(files));
}

function displayFile(fileName, fileContent) {
    const fileList = document.getElementById('file-list');
    const fileItem = document.createElement('div');
    fileItem.innerHTML = `<p><strong>${fileName}</strong></p>
                          <p><a href="${fileContent}" download="${fileName}">Download</a></p>`;
    fileList.appendChild(fileItem);
}

function loadFiles() {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.forEach(file => displayFile(file.name, file.content));
}