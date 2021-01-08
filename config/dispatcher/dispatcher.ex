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

  match "/telephones/*path" do
    Proxy.forward conn, path, "http://resource/telephones/"
  end

  match "/addresses/*path" do
    Proxy.forward conn, path, "http://resource/addresses/"
  end

  match "/individuals/*path" do
    Proxy.forward conn, path, "http://resource/individuals/"
  end

  match "/codes/*path" do
    Proxy.forward conn, path, "http://resource/codes/"
  end

  match "/companies/*path" do
    Proxy.forward conn, path, "http://resource/companies/"
  end

  match "/sessions/*path" do
    Proxy.forward conn, path, "http://login/sessions/"
  end

  match "/accounts/*path" do
    Proxy.forward conn, path, "http://registration/accounts/"
  end

  match _ do
    send_resp( conn, 404, "Route not found.  See config/dispatcher.ex" )
  end


end
