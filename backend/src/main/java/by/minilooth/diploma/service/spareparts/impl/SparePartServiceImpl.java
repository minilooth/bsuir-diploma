package by.minilooth.diploma.service.spareparts.impl;

import by.minilooth.diploma.common.enums.*;
import by.minilooth.diploma.exception.spareparts.SparePartAlreadyExistsException;
import by.minilooth.diploma.exception.spareparts.SparePartNotFoundException;
import by.minilooth.diploma.models.bean.catalog.Category;
import by.minilooth.diploma.models.bean.catalog.Group;
import by.minilooth.diploma.models.bean.catalog.Subcategory;
import by.minilooth.diploma.models.bean.keys.AvailabilityKey;
import by.minilooth.diploma.models.bean.keys.CharacteristicKey;
import by.minilooth.diploma.models.bean.spareparts.Characteristic;
import by.minilooth.diploma.models.bean.spareparts.Manufacturer;
import by.minilooth.diploma.models.bean.spareparts.Modification;
import by.minilooth.diploma.models.bean.spareparts.SparePart;
import by.minilooth.diploma.models.bean.stores.Availability;
import by.minilooth.diploma.models.bean.stores.Store;
import by.minilooth.diploma.models.bean.vehicle.Generation;
import by.minilooth.diploma.models.bean.vehicle.Make;
import by.minilooth.diploma.models.bean.vehicle.Model;
import by.minilooth.diploma.models.spareparts.ProcessSparePart;
import by.minilooth.diploma.models.spareparts.SparePartFilter;
import by.minilooth.diploma.models.spareparts.SparePartList;
import by.minilooth.diploma.repository.spareparts.SparePartRepository;
import by.minilooth.diploma.service.spareparts.ModificationService;
import by.minilooth.diploma.service.spareparts.SparePartService;
import by.minilooth.diploma.service.stores.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Transactional
@Service
public class SparePartServiceImpl implements SparePartService {

    @Autowired private SparePartRepository sparePartRepository;
    @Autowired private StoreService storeService;
    @Autowired private ModificationService modificationService;

    @Override
    public void save(SparePart sparePart) {
        sparePartRepository.save(sparePart);
    }

    @Override
    public SparePart save(ProcessSparePart processSparePart) throws SparePartAlreadyExistsException {
        if (existsByArticle(processSparePart.getArticle())) {
            throw new SparePartAlreadyExistsException(processSparePart.getArticle());
        }

        SparePart sparePart = SparePart.builder()
                .name(processSparePart.getName())
                .manufacturer(processSparePart.getManufacturer())
                .article(processSparePart.getArticle())
                .description(processSparePart.getDescription())
                .purchasePrice(processSparePart.getPurchasePrice())
                .retailPrice(processSparePart.getRetailPrice())
                .make(processSparePart.getMake())
                .model(processSparePart.getModel())
                .generation(processSparePart.getGeneration())
                .category(processSparePart.getCategory())
                .subcategory(processSparePart.getSubcategory())
                .group(processSparePart.getGroup())
                .build();
        Set<Availability> availabilities = storeService.getAll().stream().map(s -> {
            AvailabilityKey key = AvailabilityKey.builder()
                    .storeId(s.getId())
                    .sparePartId(sparePart.getId())
                    .build();
            return Availability.builder()
                    .id(key)
                    .sparePart(sparePart)
                    .store(s)
                    .quantity(0L)
                    .build();
        }).collect(Collectors.toSet());
        List<Modification> modifications = modificationService.getAllByIds(processSparePart.getCharacteristics()
                .stream().map(c -> c.getModification().getId()).collect(Collectors.toList()));
        Set<Characteristic> characteristics = processSparePart.getCharacteristics().stream().map(c -> {
            Modification modification = modifications.stream()
                    .filter(m -> m.getId().equals(c.getModification().getId())).findAny().orElse(null);
            if (Objects.nonNull(modification)) {
                CharacteristicKey key = CharacteristicKey.builder()
                        .sparePartId(sparePart.getId())
                        .modificationId(modification.getId())
                        .build();
                return Characteristic.builder()
                        .id(key)
                        .modification(modification)
                        .sparePart(sparePart)
                        .value(c.getValue())
                        .build();
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toSet());
        sparePart.setAvailabilities(availabilities);
        sparePart.setCharacteristics(characteristics);
        save(sparePart);
        return sparePart;
    }

    @Override
    public SparePart update(ProcessSparePart processSparePart, Long id) throws SparePartNotFoundException,
            SparePartAlreadyExistsException {
        SparePart sparePart = getById(id).orElseThrow(() -> new SparePartNotFoundException(id));

        if (!processSparePart.getArticle().equals(sparePart.getArticle()) && (Objects.isNull(sparePart.getArticle()) ||
                existsByArticle(processSparePart.getArticle()))) {
            throw new SparePartAlreadyExistsException(processSparePart.getArticle());
        }

        sparePart.setName(processSparePart.getName());
        sparePart.setManufacturer(processSparePart.getManufacturer());
        sparePart.setArticle(processSparePart.getArticle());
        sparePart.setDescription(processSparePart.getDescription());
        sparePart.setPurchasePrice(processSparePart.getPurchasePrice());
        sparePart.setRetailPrice(processSparePart.getRetailPrice());
        sparePart.setMake(processSparePart.getMake());
        sparePart.setModel(processSparePart.getModel());
        sparePart.setGeneration(processSparePart.getGeneration());
        sparePart.setCategory(processSparePart.getCategory());
        sparePart.setSubcategory(processSparePart.getSubcategory());
        sparePart.setGroup(processSparePart.getGroup());
        List<Modification> modifications = modificationService.getAllByIds(processSparePart.getCharacteristics()
                .stream().map(c -> c.getModification().getId()).collect(Collectors.toList()));
        Set<Characteristic> characteristics = processSparePart.getCharacteristics().stream().map(c -> {
            Modification modification = modifications.stream()
                    .filter(m -> m.getId().equals(c.getModification().getId())).findAny().orElse(null);
            if (Objects.nonNull(modification)) {
                CharacteristicKey key = CharacteristicKey.builder()
                        .sparePartId(sparePart.getId())
                        .modificationId(modification.getId())
                        .build();
                return Characteristic.builder()
                        .id(key)
                        .modification(modification)
                        .sparePart(sparePart)
                        .value(c.getValue())
                        .build();
            }
            return null;
        }).filter(Objects::nonNull).collect(Collectors.toSet());
        sparePart.setCharacteristics(characteristics);
        save(sparePart);
        return sparePart;
    }

    @Override
    public SparePart updateAvailability(List<Availability> availabilities, Long id) throws SparePartNotFoundException {
        SparePart sparePart = getById(id).orElseThrow(() -> new SparePartNotFoundException(id));
        sparePart.setAvailabilities(sparePart.getAvailabilities().stream().peek(availability -> {
            Availability newAvailability = availabilities.stream().filter(item -> item.getId().equals(availability.getId()))
                    .findAny().orElse(null);
            availability.setQuantity(Objects.nonNull(newAvailability)
                    ? newAvailability.getQuantity()
                    : availability.getQuantity());
        }).collect(Collectors.toSet()));
        save(sparePart);
        return sparePart;
    }

    @Override
    public SparePart delete(Long id) throws SparePartNotFoundException {
        SparePart sparePart = getById(id).orElseThrow(() -> new SparePartNotFoundException(id));
        delete(sparePart);
        return sparePart;
    }

    @Override
    public void delete(SparePart sparePart) {
        sparePartRepository.delete(sparePart);
    }

    @Override
    public Optional<SparePart> getById(Long id){
        return sparePartRepository.findById(id);
    }

    @Override
    public List<SparePart> getAll() {
        return sparePartRepository.findAll();
    }

    @Override
    public SparePartList getAll(SparePartFilter filter) {
        Integer page = filter.getPage();
        SparePartSort sparePartSort = filter.getSort();
        SortDirection sortDirection = filter.getSortDirection();

        Comparator<SparePart> comparator = getComparator(sparePartSort, sortDirection);

        Stream<SparePart> sparePartStream = getAll().stream();

        if (Objects.nonNull(comparator)) {
            sparePartStream = sparePartStream.sorted(comparator);
        }

        Long manufacturerId = filter.getManufacturerId();
        if (Objects.nonNull(manufacturerId)) {
            sparePartStream = sparePartStream.filter(s -> s.getManufacturer().getId().equals(manufacturerId));
        }

        String article = filter.getArticle();
        if (Objects.nonNull(article)) {
            sparePartStream = sparePartStream.filter(s -> s.getArticle().equals(article));
        }

        String description = filter.getDescription();
        if (Objects.nonNull(description) && !description.isEmpty()) {
            sparePartStream = sparePartStream.filter(s -> s.getDescription().startsWith(description));
        }

        Float purchasePriceFrom = filter.getPurchasePriceFrom();
        if (Objects.nonNull(purchasePriceFrom)) {
            sparePartStream = sparePartStream.filter(s -> s.getPurchasePrice() >= purchasePriceFrom);
        }

        Float purchasePriceTo = filter.getPurchasePriceTo();
        if (Objects.nonNull(purchasePriceTo)) {
            sparePartStream = sparePartStream.filter(s -> s.getPurchasePrice() <= purchasePriceTo);
        }

        Float retailPriceFrom = filter.getRetailPriceFrom();
        if (Objects.nonNull(retailPriceFrom)) {
            sparePartStream = sparePartStream.filter(s -> s.getRetailPrice() >= retailPriceFrom);
        }

        Float retailPriceTo = filter.getRetailPriceTo();
        if (Objects.nonNull(retailPriceTo)) {
            sparePartStream = sparePartStream.filter(s -> s.getRetailPrice() <= retailPriceTo);
        }

        Long availabilityFrom = filter.getAvailabilityFrom();
        if (Objects.nonNull(availabilityFrom)) {
            sparePartStream = sparePartStream.filter(s -> s.getAvailabilities().stream()
                    .mapToLong(Availability::getQuantity).sum() >= availabilityFrom);
        }

        Long availabilityTo = filter.getAvailabilityTo();
        if (Objects.nonNull(availabilityTo)) {
            sparePartStream = sparePartStream.filter(s -> s.getAvailabilities().stream()
                    .mapToLong(Availability::getQuantity).sum() <= availabilityTo);
        }

        Long makeId = filter.getMakeId();
        if (Objects.nonNull(makeId)) {
            sparePartStream = sparePartStream.filter(s -> s.getMake().getId().equals(makeId));
        }

        Long modelId = filter.getModelId();
        if (Objects.nonNull(modelId)) {
            sparePartStream = sparePartStream.filter(s -> s.getModel().getId().equals(modelId));
        }

        Long generationId = filter.getGenerationId();
        if (Objects.nonNull(generationId)) {
            sparePartStream = sparePartStream.filter(s -> s.getGeneration().getId().equals(generationId));
        }

        Long categoryId = filter.getCategoryId();
        if (Objects.nonNull(categoryId)) {
            sparePartStream = sparePartStream.filter(s -> s.getCategory().getId().equals(categoryId));
        }

        Long subcategoryId = filter.getSubcategoryId();
        if (Objects.nonNull(subcategoryId)) {
            sparePartStream = sparePartStream.filter(s -> s.getSubcategory().getId().equals(subcategoryId));
        }

        Long groupId = filter.getGroupId();
        if (Objects.nonNull(groupId)) {
            sparePartStream = sparePartStream.filter(s -> s.getGroup().getId().equals(groupId));
        }

        List<SparePart> spareParts = sparePartStream.collect(Collectors.toList());
        Integer count = spareParts.size();

        spareParts = spareParts.stream().skip((Objects.nonNull(page) ? page - 1 : 0) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)
                .collect(Collectors.toList());

        SparePartList sparePartList = SparePartList.builder()
                .spareParts(spareParts)
                .build();

        sparePartList.setPages(count == 0 ? 1 : (count % ITEMS_PER_PAGE == 0
                ? (count / ITEMS_PER_PAGE)
                : ((count / ITEMS_PER_PAGE) + 1L)));

        return sparePartList;
    }

    @Override
    public Boolean existsByManufacturer(Manufacturer manufacturer) {
        return sparePartRepository.existsByManufacturer(manufacturer);
    }

    @Override
    public Boolean existsByMake(Make make) {
        return sparePartRepository.existsByMake(make);
    }

    @Override
    public Boolean existsByModel(Model model) {
        return sparePartRepository.existsByModel(model);
    }

    @Override
    public Boolean existsByGeneration(Generation generation) {
        return sparePartRepository.existsByGeneration(generation);
    }

    @Override
    public Boolean existsByCategory(Category category) {
        return sparePartRepository.existsByCategory(category);
    }

    @Override
    public Boolean existsBySubcategory(Subcategory subcategory) {
        return sparePartRepository.existsBySubcategory(subcategory);
    }

    @Override
    public Boolean existsByGroup(Group group) {
        return sparePartRepository.existsByGroup(group);
    }

    @Override
    public Boolean existsByModification(Modification modification) {
        return sparePartRepository.existsByCharacteristicsModification(modification);
    }

    @Override
    public Boolean existsByArticle(String article) {
        return sparePartRepository.existsByArticle(article);
    }

    private Comparator<SparePart> getComparator(SparePartSort sparePartSort) {
        if (Objects.nonNull(sparePartSort)) {
            switch (sparePartSort) {
                case MAKE:
                    return Comparator.comparing(SparePart::getMake);
                case NAME:
                    return Comparator.comparing(SparePart::getName);
                case GROUP:
                    return Comparator.comparing(SparePart::getGroup);
                case MODEL:
                    return Comparator.comparing(SparePart::getModel);
                case ARTICLE:
                    return Comparator.comparing(SparePart::getArticle);
                case CATEGORY:
                    return Comparator.comparing(SparePart::getCategory);
                case GENERATION:
                    return Comparator.comparing(SparePart::getGeneration);
                case DESCRIPTION:
                    return Comparator.comparing(SparePart::getDescription);
                case SUBCATEGORY:
                    return Comparator.comparing(SparePart::getSubcategory);
                case MANUFACTURER:
                    return Comparator.comparing(SparePart::getManufacturer);
                case RETAIL_PRICE:
                    return Comparator.comparing(SparePart::getRetailPrice);
                case PURCHASE_PRICE:
                    return Comparator.comparing(SparePart::getPurchasePrice);
                default:
                    return null;
            }
        }
        return null;
    }

    private Comparator<SparePart> getComparator(SparePartSort sparePartSort, SortDirection sortDirection) {
        Comparator<SparePart> comparator = getComparator(sparePartSort);

        if (Objects.nonNull(sortDirection) && Objects.nonNull(comparator)) {
            switch (sortDirection) {
                case DESC:
                    return comparator.reversed();
                case ASC:
                default:
                    return comparator;
            }
        }

        return comparator;
    }
}
