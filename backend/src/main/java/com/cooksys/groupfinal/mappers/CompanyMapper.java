package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.entities.Company;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring", uses = {TeamMapper.class, BasicUserMapper.class})
public interface CompanyMapper {

    CompanyDto entityToDto(Company company);

    Set<CompanyDto> entitiesToDtos(Set<Company> companies);

}
