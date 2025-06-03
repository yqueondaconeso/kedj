"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, Music, CheckCircle, MessageCircle } from "lucide-react"
import Image from "next/image"

// Tipos para Spotify
interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
  external_urls: {
    spotify: string
  }
}

export default function KeDJPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addedSongs, setAddedSongs] = useState<Set<string>>(new Set())
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null)

  // Tu número de WhatsApp real
  const WHATSAPP_NUMBER = "5491127879534"

  // Función para buscar en Spotify
  const searchSpotify = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const mockSpotifyResults = await mockSpotifySearch(query)
      setSearchResults(mockSpotifyResults)
      setShowResults(true)
    } catch (err) {
      console.error("Error buscando en Spotify:", err)
      setError("No se pudo conectar con Spotify. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  // Simulación de búsqueda en Spotify
  const mockSpotifySearch = async (query: string): Promise<SpotifyTrack[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerQuery = query.toLowerCase()

    const spotifyDatabase = [
      {
        id: "1",
        name: "Despacito",
        artists: [{ name: "Luis Fonsi" }, { name: "Daddy Yankee" }],
        album: {
          name: "Despacito",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 229000,
        external_urls: { spotify: "https://open.spotify.com/track/6habFhsOp2NvshLv26DqMb" },
      },
      {
        id: "2",
        name: "La Botella",
        artists: [{ name: "Duki" }],
        album: {
          name: "Desde el Fin del Mundo",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 192000,
        external_urls: { spotify: "https://open.spotify.com/track/4MzXwWMhyBbmu6hOcLVD49" },
      },
      {
        id: "3",
        name: "Tusa",
        artists: [{ name: "Karol G" }, { name: "Nicki Minaj" }],
        album: {
          name: "Tusa",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 200000,
        external_urls: { spotify: "https://open.spotify.com/track/7k4t7uLgtOxPwTpFmtJNTY" },
      },
      {
        id: "4",
        name: "Con Altura",
        artists: [{ name: "Rosalía" }, { name: "J Balvin" }],
        album: {
          name: "Con Altura",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 178000,
        external_urls: { spotify: "https://open.spotify.com/track/2qG5sZ7Si6sdK74qLxedYM" },
      },
      {
        id: "5",
        name: "Baila Baila Baila",
        artists: [{ name: "Ozuna" }],
        album: {
          name: "Nibiru",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 211000,
        external_urls: { spotify: "https://open.spotify.com/track/7uH27oIt4a6cIFCA8ZPcyG" },
      },
      {
        id: "6",
        name: "Callaita",
        artists: [{ name: "Bad Bunny" }],
        album: {
          name: "Callaita",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 250000,
        external_urls: { spotify: "https://open.spotify.com/track/2TH65lNHgvLxCKXM3apjxI" },
      },
      {
        id: "7",
        name: "Que Tire Pa Lante",
        artists: [{ name: "Daddy Yankee" }],
        album: {
          name: "Que Tire Pa Lante",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 195000,
        external_urls: { spotify: "https://open.spotify.com/track/6RyaV7owmVU6fzEPE17sF1" },
      },
      {
        id: "8",
        name: "Loco",
        artists: [{ name: "Beéle" }, { name: "Farruko" }],
        album: {
          name: "Loco",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 224000,
        external_urls: { spotify: "https://open.spotify.com/track/4F4kZXcoBcwNa1cDxAEQmZ" },
      },
      {
        id: "9",
        name: "Hawái",
        artists: [{ name: "Maluma" }],
        album: {
          name: "Papi Juancho",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 200000,
        external_urls: { spotify: "https://open.spotify.com/track/1yoMvmasuxZfqHEipJhRbp" },
      },
      {
        id: "10",
        name: "Safaera",
        artists: [{ name: "Bad Bunny" }, { name: "Jowell & Randy" }, { name: "Ñengo Flow" }],
        album: {
          name: "YHLQMDLG",
          images: [{ url: "/placeholder.svg?height=64&width=64" }],
        },
        duration_ms: 295000,
        external_urls: { spotify: "https://open.spotify.com/track/2DEZmgHKAvm41k4J3R2E9Y" },
      },
    ]

    return spotifyDatabase.filter(
      (track) =>
        track.name.toLowerCase().includes(lowerQuery) ||
        track.artists.some((artist) => artist.name.toLowerCase().includes(lowerQuery)),
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchSpotify(searchQuery)
    }
  }

  const handleAddToPlaylist = (track: SpotifyTrack) => {
    // Agregar la canción a la lista de agregadas
    setAddedSongs((prev) => new Set([...prev, track.id]))

    // Mostrar mensaje de éxito
    setShowSuccessMessage(`"${track.name}" agregada a la playlist`)

    // Enviar mensaje a WhatsApp con el título de la canción
    sendGreetingToWhatsApp(track.name)

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(null)
    }, 3000)
  }

  const sendGreetingToWhatsApp = (songTitle?: string) => {
    const message = `¡Hola! 👋

Acabo de pedir un tema en #KeDJ!${
      songTitle
        ? `
🎵 "${songTitle}"`
        : ""
    }

Saludos de la plaza! 💥
Fecha: ${new Date().toLocaleString("es-AR")}`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
    setError(null)
  }

  // Formatea la duración de ms a formato mm:ss
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start p-8 relative overflow-hidden">
      {/* Guirnaldas de banderines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Guirnalda superior */}
        <div className="absolute top-0 left-0 w-full h-16 flex items-start justify-center">
          <div className="flex space-x-1 transform -rotate-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-8 h-12 ${
                  i % 4 === 0
                    ? "bg-red-500"
                    : i % 4 === 1
                      ? "bg-yellow-400"
                      : i % 4 === 2
                        ? "bg-green-500"
                        : "bg-blue-500"
                } clip-triangle shadow-lg`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Guirnalda izquierda */}
        <div className="absolute top-20 left-4 h-96 flex flex-col items-center transform rotate-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-8 mb-1 ${
                i % 3 === 0 ? "bg-pink-500" : i % 3 === 1 ? "bg-orange-500" : "bg-purple-500"
              } shadow-md`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          ))}
        </div>

        {/* Guirnalda derecha */}
        <div className="absolute top-20 right-4 h-96 flex flex-col items-center transform -rotate-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-8 mb-1 ${
                i % 3 === 0 ? "bg-cyan-500" : i % 3 === 1 ? "bg-lime-500" : "bg-rose-500"
              } shadow-md`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          ))}
        </div>

        {/* Luces parpadeantes */}
        <div className="absolute top-12 left-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-300/50"></div>
        <div
          className="absolute top-32 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-24 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 right-1/3 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Confeti flotante */}
        <div
          className="absolute top-16 left-1/5 w-2 h-2 bg-pink-400 rotate-45 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-28 right-1/5 w-2 h-2 bg-yellow-400 rotate-45 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute top-36 left-2/3 w-2 h-2 bg-cyan-400 rotate-45 animate-bounce"
          style={{ animationDelay: "1.2s" }}
        ></div>

        {/* Estrellas decorativas */}
        <div className="absolute top-20 left-1/6 text-yellow-400 text-xl animate-pulse">✨</div>
        <div
          className="absolute top-44 right-1/6 text-pink-400 text-lg animate-pulse"
          style={{ animationDelay: "0.7s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-52 left-1/2 text-cyan-400 text-sm animate-pulse"
          style={{ animationDelay: "1.4s" }}
        >
          ✨
        </div>
      </div>

      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>{showSuccessMessage}</span>
        </div>
      )}

      <header className="text-center mb-8 relative z-10">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <Image
            src="/logo.png"
            alt="Y Que Onda Con Eso? - Logo de #KeDJ!"
            width={160}
            height={160}
            className="rounded-2xl object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-5xl font-bold text-[#bb86fc] mb-2 tracking-normal font-mono uppercase border-2 border-[#bb86fc] px-4 py-2 bg-[#bb86fc]/10 shadow-lg shadow-[#bb86fc]/20">
          #KeDJ!
        </h1>

        <p className="text-gray-700 text-lg font-semibold">¡Pedí tu tema y hacé vibrar la plaza!</p>
      </header>

      <section className="bg-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl relative z-10 border-2 border-gray-200">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar canción o artista..."
              className="w-full pl-12 pr-4 py-3 text-gray-900 bg-white rounded-lg border-2 border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff7b00] hover:bg-[#e76b00] disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-base focus:outline-none focus:ring-2 focus:ring-[#ff7b00] focus:ring-offset-2 focus:ring-offset-gray-100 shadow-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Music className="w-5 h-5" />
                <span>Agregar a la playlist</span>
              </>
            )}
          </button>
        </form>

        {/* Resultados de búsqueda */}
        {showResults && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resultados:</h3>
              <button onClick={clearSearch} className="text-gray-500 hover:text-gray-700 text-sm">
                Limpiar
              </button>
            </div>

            {error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-gray-500 mt-2">Intenta de nuevo más tarde</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {searchResults.map((track) => (
                  <div
                    key={track.id}
                    className={`bg-white rounded-lg p-4 transition-colors cursor-pointer border-2 ${
                      addedSongs.has(track.id)
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    }`}
                    onClick={() => !addedSongs.has(track.id) && handleAddToPlaylist(track)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                        <Image
                          src={track.album.images[0]?.url || "/placeholder.svg?height=48&width=48"}
                          alt={track.album.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{track.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{track.artists.map((a) => a.name).join(", ")}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{formatDuration(track.duration_ms)}</p>
                          {addedSongs.has(track.id) ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span className="text-xs font-semibold">Agregada</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-[#ff7b00]">
                              <Music className="w-4 h-4 mr-1" />
                              <span className="text-xs font-semibold">Agregar</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No se encontraron canciones</p>
                <p className="text-sm text-gray-500 mt-2">Probá con otro término de búsqueda</p>
              </div>
            )}
          </div>
        )}
      </section>

      <div className="mt-8 text-center text-gray-700 text-sm relative z-10">
        <p className="font-semibold">💥 La feria de tu barrio 💥</p>

        {/* Botón de saludo */}
        <button
          onClick={() => sendGreetingToWhatsApp()}
          className="mt-4 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 mx-auto"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Mandar un saludo</span>
        </button>

        <p className="mt-4 text-xs opacity-75">Y que onda con eso? 🚀</p>
      </div>
    </div>
  )
}
