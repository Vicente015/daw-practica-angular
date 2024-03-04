import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const GITHUB_API_TOKEN = ''

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private username = ''

  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene el perfil del usuario
   */
  getUser() {
    return this.http.get(`https://api.github.com/users/${this.username}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`
        }
      }
    )
  }

  /**
   * Obtiene los repositorios del usuario
   */
  getRepos() {
    return this.http.get(`https://api.github.com/users/${this.username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`
        }
      }
    )
  }

  /**
   * Busca usuarios, es una ruta distinta específica para búsqueda que
   * response más rápido y tienes menos límites de peticiones
   */
  searchUser() {
    return this.http.get(`https://api.github.com/search/users?q=${this.username}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`
        }
      }
    )
  }

  /**
   * Actualiza el username al que consultar
   */
  updateUser(username: string) {
    this.username = username
  }
}
