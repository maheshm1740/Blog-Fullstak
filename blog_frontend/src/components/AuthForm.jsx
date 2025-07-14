
function AuthForm({
  title,
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  buttonText

}){
  return(
    <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">{title}</h2>
          <input
            className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            className="w-full mb-6 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            
            {buttonText}
          </button>
        </form>
  )
}

export default AuthForm;