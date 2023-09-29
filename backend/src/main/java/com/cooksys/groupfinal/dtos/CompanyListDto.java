package com.cooksys.groupfinal.dtos;

import java.util.Set;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CompanyListDto {
    private Set<CompanyDto> companies;
}
