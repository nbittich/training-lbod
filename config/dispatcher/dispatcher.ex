defmodule Dispatcher do
  use Plug.Router

  def start(_argv) do
    port = 80
    IO.puts "Starting Plug with Cowboy on port #{port}"
    Plug.Adapters.Cowboy.http __MODULE__, [], port: port
    :timer.sleep(:infinity)
  end

  plug Plug.Logger
  plug :match
  plug :dispatch

  options _ do
    send_resp( conn, 200, "Option calls are accepted by default" )
  end

  match "/api/addresses/*path" do
    Proxy.forward conn, path, "http://resource/addresses/"
  end
  
  match "/api/uploads/*path" do
    Proxy.forward conn, path, "http://file/files/"
  end

  match "/api/files/*path" do
    Proxy.forward conn, path, "http://resource/files/"
  end

  match "/api/codes/*path" do
    Proxy.forward conn, path, "http://resource/codes/"
  end

  match "/api/companies/*path" do
    Proxy.forward conn, path, "http://resource/companies/"
  end
  match "/api/contacts/*path" do
    Proxy.forward conn, path, "http://resource/contacts/"
  end
  match "/api/denominations/*path" do
    Proxy.forward conn, path, "http://resource/denominations/"
  end

  match "/api/sessions/*path" do
    Proxy.forward conn, path, "http://login/sessions/"
  end

  match "/api/accounts/*path" do
    Proxy.forward conn, path, "http://registration/accounts/"
  end

  match _ do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end

end
