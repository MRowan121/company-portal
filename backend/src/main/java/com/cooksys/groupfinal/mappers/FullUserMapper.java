package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring", uses = {ProfileMapper.class, CredentialsMapper.class, CompanyMapper.class, TeamMapper.class})
public interface FullUserMapper {

    FullUserDto entityToFullUserDto(User user);

    Set<FullUserDto> entitiesToFullUserDtos(Set<User> users);

    User requestDtoToEntity(UserRequestDto userRequestDto);

}
