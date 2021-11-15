package by.minilooth.diploma.service.users.impl;

import by.minilooth.diploma.models.bean.users.Role;
import by.minilooth.diploma.repository.users.RoleRepository;
import by.minilooth.diploma.service.users.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired private RoleRepository roleRepository;

    @Override
    public void save(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void delete(Role role) {
        roleRepository.delete(role);
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> getByAuthority(String name) {
        return roleRepository.findByAuthority(name);
    }

}
