import { Component } from '@angular/core';
import { GithubService } from '../../services/github/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [GithubService]
})
export class ProfileComponent {
  public user: any = undefined
  public repos: any = undefined
  public searchResults: any[] = []
  public query = ''

  constructor(private _githubService: GithubService) {
  }

  searchUser() {
    if (!this.query) return
    this._githubService.updateUser(this.query)

    this._githubService.searchUser().subscribe((data) => {
      const datos = data as { items: { login: string, avatar_url: string }[] }
      this.searchResults = datos.items.map((data) => ({ name: data.login, avatar_url: data.avatar_url }))
      // if (this.searchResults.length > 10) this.searchResults.length = 10
    })
  }

  getUserInfo(event: any) {
    const seleccionado = event.target?.attributes.id.value
    this.query = seleccionado
    this.searchResults = []
    this._githubService.updateUser(this.query)
    this._githubService.getUser().subscribe((data) => {
      this.user = data
    })
    this._githubService.getRepos().subscribe((data) => {
      this.repos = (data as any[]).sort((a, b) => b.stargazers_count - a.stargazers_count)
    })
  }

  reset() {
    this.query = ''
    this.searchResults = []
    this.user = undefined
    this.repos = undefined
  }
}
