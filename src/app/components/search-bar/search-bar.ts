import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CityService} from '../../services/CityService';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar implements OnInit {

  searchForm!: FormGroup;

  constructor(private cityService: CityService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
        searchBar: [null, Validators.required]
      },
      {
        updateOn: 'blur',
      });
  }

  onSubmitForm(): void {
    this.cityService.searchPossibleCities(this.searchForm.controls['searchBar'].value);
  }
}
